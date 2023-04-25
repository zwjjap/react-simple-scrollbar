//@author:zengwei
//@date:2021/7/14
import React,{useRef,useState,useEffect,useMemo,useCallback,memo, useImperativeHandle,forwardRef} from 'react';
import './style/style.less';


function Scrollbar({children,style={},height='auto',handleScroll,hoverBarHeight=9,barItem=6,autoHide=false,loading=true,className='',resizeMonitor=false},ref){
    useImperativeHandle(ref, () => ({
        scrollLeft:(value) => {
            scrollBox.current.scrollLeft = value;
        }
    }))
    
    //最外层的容器dom
    const scrollContainer = useRef(null);

    //储存垂直 鼠标 按下的初始位置
    const verticalItemMouseDomPos = useRef(0);

    //储存水平 鼠标 按下的初始位置
    const horticalItemMouseDomPos = useRef(0);

    //容器dom
    const scrollBox = useRef(null);

    let posInfor = useRef(null);

    //右侧滚动条 dom
    const verItemDom = useRef(null);
    
    //底部滚动条 dom
    const horItemDom  = useRef(null);

    const horizontalWrap = useRef(null);
    const verticalWrap = useRef(null);

    const verItemDomHeight = useRef(30);
    const horItemDomWidth = useRef(0);

    const childDom = useRef(null);
    const childResizeObserver = useRef(null);

    //浏览器滚动条宽度
    const [browserScrollBarWidth,setBrowserScrollBarWidth] = useState(17);

    //储存滚动条滚动信息
    const scrollInfor = useRef({
        x:0,
        y:0,
        x_percent:0,
        y_percent:0
    });

    //记录鼠标是否mousedown
    const mouseIsDown = useRef(false);

    //鼠标滚动定时器
    const mouseWheelSetTime = useRef(null);

    //垂直滚动条的真实高度
    const v_real_height = useRef(null);

    //
    const scrolling = useRef(false);
    const lastViewScrollLeft = useRef(0);
    const lastViewScrollTop = useRef(0);
    const detectScrollingInterval = useRef(null);

    //滚动条显示变量
    const [barState,setBarState] = useState({
        tableClientWidth:0,
        tableScrollWidth:0,
        tableClientHeight:0,
        tableScrollHeight:0
    });

    const {tableClientWidth,tableScrollWidth,tableClientHeight,tableScrollHeight} = barState;

    //滚动条 配置计算
    const computerBarConfig = () =>{

        if(!loading){
            return;
        }
        
        const table_client_width = scrollBox.current.clientWidth;
        const table_scroll_width = scrollBox.current.scrollWidth;
        const table_client_height = scrollBox.current.clientHeight;
        const table_scroll_height = scrollBox.current.scrollHeight;

        if(table_client_width == 0){
            return;
        }

        if(table_client_width != tableClientWidth || table_scroll_width != tableScrollWidth || table_client_height != tableClientHeight || table_scroll_height != tableScrollHeight){

            setBarState({
                tableClientWidth:table_client_width,
                tableScrollWidth:table_scroll_width,
                tableClientHeight:table_client_height,
                tableScrollHeight:table_scroll_height
            });

            setTimeout(() => {
                //处理 水平滚动条 从 有 到 无
                if(table_client_width == table_scroll_width){
                    scrollInfor.current.x = 0;
                    scrollInfor.current.x_percent = 0;
                }

                scrollInfor.current.x = scrollInfor.current.x_percent * (table_scroll_width - table_client_width);
                scrollInfor.current.y = scrollInfor.current.y_percent * (table_scroll_height - table_client_height);

                const  horItemDom_left = scrollInfor.current.x_percent * (table_client_width - horItemDomWidth.current);
                const  verItemDom_top = scrollInfor.current.y_percent * (table_client_height - verItemDomHeight.current);
            
                scrollBox.current && (scrollBox.current.scrollLeft = scrollInfor.current.x);
                scrollBox.current && (scrollBox.current.scrollTop = scrollInfor.current.y);
                
                horItemDom.current && (horItemDom.current.style.left = horItemDom_left  + 'px');
                verItemDom.current && (verItemDom.current.style.top = verItemDom_top  + 'px');

                handleScrollFrame();
            },0);
        }
    }

    //对外开放滚动信息
    function handleScrollFrame(){
        handleScroll && handleScroll({...scrollInfor.current});
    }

    //
    function scrollContainerHandleMouseEnter(status,type){
        if(status && type){
            // computerBarConfig()
        }
        //
        if(autoHide){
            (verticalWrap.current && (status || !mouseIsDown.current)) && (verticalWrap.current.style.display = status ? 'block' : 'none');
            (horizontalWrap.current && (status || !mouseIsDown.current)) && (horizontalWrap.current.style.display = status ? 'block' : 'none'); 
        }  
    }

    function handleScrollStart(){
        computerBarConfig();
    }

    function handleScrollStop(){

    }

    function detectScrolling() {
        if (scrolling.current) return;
        scrolling.current = true;
        handleScrollStart();
        detectScrollingInterval.current = setInterval(() => {
            const {x,y} = scrollInfor.current;
            if (lastViewScrollLeft.current === x
                && lastViewScrollTop.current === y) {
                clearInterval(detectScrollingInterval.current);
                scrolling.current = false;
                handleScrollStop();
            }
            lastViewScrollLeft.current = x;
            lastViewScrollTop.current = y;
        }, 100);
    }



    /*******************************垂直start*************************** */

    //垂直滚动条拖动
    const verMouseOver = useCallback((e) => {
        e.preventDefault();
        // const posInfor = scrollBox.current.getBoundingClientRect();
        const currentPos = e.clientY - posInfor.current.y - verticalItemMouseDomPos.current;
        //const verItemDomHeight.current = 60; // verItemDom.current.clientHeight

        //垂直item 位置
        let verItemTop;
        if(currentPos >=0){
            verItemTop = (currentPos > barState.tableClientHeight - verItemDomHeight.current) ? (barState.tableClientHeight - verItemDomHeight.current) : currentPos;
        }else{
            verItemTop = 0;
        }
       
        verItemDom.current.style.top = verItemTop  + 'px';

        //
        const s_top = verItemTop / (barState.tableClientHeight - verItemDomHeight.current) * (barState.tableScrollHeight - barState.tableClientHeight);
        scrollBox.current.scrollTop = s_top;
        scrollInfor.current.y = s_top;
        scrollInfor.current.y_percent = verItemTop / (barState.tableClientHeight - verItemDomHeight.current);
        handleScrollFrame();

    },[barState]);

    const verMouseDown = useCallback((e) => {
        mouseIsDown.current = true;
        
        verticalItemMouseDomPos.current = e.clientY - e.target.getBoundingClientRect().y;

        posInfor.current = scrollBox.current.getBoundingClientRect()

        //设置bar item 鼠标移入 高度
        verItemDom.current.style.width = hoverBarHeight + 'px'

        //e.target.addEventListener('mousemove',verMouseOver);
        document.addEventListener('mousemove',verMouseOver);

    },[barState]);

    function verMouseEnter(e){
        // computerBarConfig();
        e.target.style.width = hoverBarHeight + 'px';
    }


    /*******************************!end*************************** */


    /**************水平-start************ */
    //滚动条拖动
    const horMouseOver = useCallback((e) => {
        e.preventDefault();
        // const horItemDomWidth.current = horItemDom.current.clientWidth;
        // const posInfor = scrollBox.current.getBoundingClientRect();
        const currentPos = e.clientX - posInfor.current.x - horticalItemMouseDomPos.current;

        //水平item 位置
        let horItemLeft;
        if(currentPos >=0){
            horItemLeft = (currentPos >= barState.tableClientWidth - horItemDomWidth.current) ? (barState.tableClientWidth - horItemDomWidth.current) : currentPos;
        }else{
            horItemLeft = 0;
        }
        horItemDom.current.style.left = horItemLeft  + 'px';

        //
        const s_left = horItemLeft / (barState.tableClientWidth) * barState.tableScrollWidth;
    
        scrollBox.current.scrollLeft = s_left;

        scrollInfor.current.x = s_left;
        scrollInfor.current.x_percent = horItemLeft / (barState.tableClientWidth - horItemDomWidth.current);
        handleScrollFrame();
    },[barState]);

    const horMouseDown = useCallback((e) => {
        mouseIsDown.current = true;
        horticalItemMouseDomPos.current = e.clientX - e.target.getBoundingClientRect().x;
        posInfor.current = scrollBox.current.getBoundingClientRect();

        //设置bar item 鼠标移入 高度
        horItemDom.current.style.height = hoverBarHeight + 'px'

        document.addEventListener('mousemove',horMouseOver);

    },[barState]);

    function horMouseEnter(e){
        // computerBarConfig();
        e.target.style.height = hoverBarHeight + 'px';
    }

    /**************水平-end************ */

    function handleMouseLeave (attr,e){
        !mouseIsDown.current && (e.target.style[attr]= barItem + 'px')
    }

    const documentRemoveMouseup = useCallback((e) => {
        mouseIsDown.current = false;

        scrollContainer.current && scrollContainerHandleMouseEnter(scrollContainer.current.contains(e.target) ? true : false,false);

        horItemDom.current && (horItemDom.current.style.height =  barItem + 'px');
        verItemDom.current && (verItemDom.current.style.width = barItem + 'px');
        document.removeEventListener('mousemove',verMouseOver);
        document.removeEventListener('mousemove',horMouseOver);
    },[barState]);


    //监听窗口

    useEffect(() => {

        const {clientWidth,offsetWidth} = scrollBox.current;

        setBrowserScrollBarWidth(offsetWidth - clientWidth);
        
        //取消document monseUp
        document.addEventListener('mouseup',documentRemoveMouseup,{passive: true});
        window.addEventListener('resize',computerBarConfig,{passive: true});
        return () => {

            window.removeEventListener('resize',computerBarConfig);
            document.removeEventListener('mouseup',documentRemoveMouseup);
        }

        //处理编辑表格时，存在的异常问题
        // if(scrollInfor.current.x != scrollBox.current.scrollLeft){
        //     scrollBox.current.scrollLeft = scrollInfor.current.x;
        // }

    },[barState]);

    useEffect(() => {

        //
        if(resizeMonitor){
            childResizeObserver.current = new ResizeObserver((entries) => {
                computerBarConfig()
            });

            childResizeObserver.current.observe(childDom.current);
        }

        return () => {
            resizeMonitor && childResizeObserver.current.disconnect();
            window.removeEventListener('resize',computerBarConfig);
            document.removeEventListener('mouseup',documentRemoveMouseup);
            scrollBox.current && scrollBox.current.removeEventListener('scroll',handlemouseWheel);
            clearInterval(detectScrollingInterval.current);
        }
    },[]);


    // 鼠标换轮滚动
    const handlemouseWheel = useCallback((e) => {

        if(mouseIsDown.current){
            return;
        }

        e.preventDefault();
        const currentScrollTop = e.target.scrollTop;
        const currentScrollLeft = e.target.scrollLeft;
        
        scrollInfor.current.y = currentScrollTop;

        // const v_r_w = v_real_height.current || verItemDomHeight.current;
        //const v_r_w = verItemDomHeight.current;

        scrollInfor.current.y_percent = barState.tableScrollHeight - barState.tableClientHeight &&  currentScrollTop / (barState.tableScrollHeight - barState.tableClientHeight) || 0;
        if(scrollInfor.current.y_percent > 1){
            return;
        }

        verItemDom.current && (verItemDom.current.style.top = (currentScrollTop * (barState.tableClientHeight - (v_real_height.current ? verItemDomHeight.current - v_real_height.current : 0))) / barState.tableScrollHeight  + 'px');
        horItemDom.current && (horItemDom.current.style.left = (currentScrollLeft * barState.tableClientWidth) / barState.tableScrollWidth  + 'px');

        
        scrollInfor.current.x = currentScrollLeft;
        scrollInfor.current.x_percent = currentScrollLeft / (barState.tableScrollWidth - barState.tableClientWidth);
        scrollInfor.current.x_percent = scrollInfor.current.x_percent > 0.995 ? 1 : scrollInfor.current.x_percent;

        detectScrolling();

        handleScrollFrame();
        
        
    }) 

    //计算滚动条 高/宽度
    // type?string h:水平  v:垂直
    const getAttr = useCallback((type) => {
        let result;
        if(type == 'v'){  //垂直
            const h = tableClientHeight / tableScrollHeight * tableClientHeight;
            if(h > 30){
                result = h;
                v_real_height.current = null;
                verItemDomHeight.current = result;
            }else{
                v_real_height.current = h;
                verItemDomHeight.current = 30;
                result = 30;
            }
            // result = h;
            // verItemDomHeight.current = result;
            return result;
        }
        horItemDomWidth.current = tableClientWidth * tableClientWidth / tableScrollWidth;
        return horItemDomWidth.current;

    },[barState]);

    //组件滚动条计算 和 监听鼠标滑轮滚动
    useEffect(() => {
        
        !mouseIsDown.current && computerBarConfig();
        // if(verItemDom.current || horItemDom.current){
        //     //scrollBox.current.removeEventListener('scroll',handlemouseWheel);
        //     scrollBox.current.addEventListener('scroll',handlemouseWheel,{passive: false});
        // } 
        scrollBox.current.addEventListener('scroll',handlemouseWheel,{passive: false}); 
        return () => {
            scrollBox.current.removeEventListener('scroll',handlemouseWheel);
        }
    });

    return (
        <div className={`cus-scroll-box ${className}`} ref={scrollContainer} onClick={() => {}} onMouseEnter={scrollContainerHandleMouseEnter.bind(this,true,true)} onMouseLeave={scrollContainerHandleMouseEnter.bind(this,false,true)}>
            <div className="cus-scroll-wrap" ref={scrollBox} style={{...style, marginRight:`-${browserScrollBarWidth >= 15 ? 17 : browserScrollBarWidth}px`,marginBottom:`-${browserScrollBarWidth >= 15 ? 17 : browserScrollBarWidth}px`,...(height.constructor == Number && {height:`${height + (browserScrollBarWidth >= 15 ? 17 : 0)}px`} || {})}}>
                <div ref={childDom}>
                    {children}
                </div>
                {(tableScrollHeight > tableClientHeight) && (
                    <div className="vertical-wrap" ref={verticalWrap} style={{display:autoHide ? 'none' : 'block'}}>
                        {/* style={{height:(tableClientHeight / tableScrollHeight * 100) + '%'}} */}
                        <div ref={verItemDom} onMouseLeave={handleMouseLeave.bind(null,'width')} onMouseEnter={verMouseEnter} onMouseDown={verMouseDown} className="item" style={{width:barItem+'px',height:getAttr('v') + 'px'}}></div> 
                    </div>
                )}
                {(tableScrollWidth > tableClientWidth) && (
                    <div className="horizontal-wrap" ref={horizontalWrap} style={{display:autoHide ? 'none' : 'block'}}>
                        <div ref={horItemDom} onMouseLeave={handleMouseLeave.bind(null,'height')} onMouseEnter={horMouseEnter} onMouseDown={horMouseDown} className="item" style={{height:barItem+'px',width:getAttr('h') + 'px'}}></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default forwardRef(Scrollbar);

