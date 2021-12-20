//@author:zengwei
//@date:2021/7/14
import React,{useRef,useState,useEffect,useMemo,useCallback,memo} from 'react';
import './style/style.less';

let verItemDomHeight = 30;
let horItemDomWidth = 0;

function Scrollbar({children,style={},height='auto',handleScroll,hoverBarHeight=9,barItem=6,autoHide=false}){

    //最外层的容器dom
    const scrollContainer = useRef(null);

    //储存垂直 鼠标 按下的初始位置
    const verticalItemMouseDomPos = useRef(0);

    //储存水平 鼠标 按下的初始位置
    const horticalItemMouseDomPos = useRef(0);

    //容器dom
    const scrollBox = useRef(null);

    let posInfor = null;

    //右侧滚动条 dom
    const verItemDom = useRef(null);
    
    //底部滚动条 dom
    const horItemDom  = useRef(null);

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

        const table_client_width = scrollBox.current.clientWidth;
        const table_scroll_width = scrollBox.current.scrollWidth;
        const table_client_height = scrollBox.current.clientHeight;
        const table_scroll_height = scrollBox.current.scrollHeight;

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

                const  horItemDom_left = scrollInfor.current.x_percent * (table_client_width - horItemDomWidth);
                const  verItemDom_top = scrollInfor.current.y_percent * (table_client_height - verItemDomHeight);
            
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
    function scrollContainerHandleMouseEnter(status){
        if(autoHide){
            const verticalWrapDom = scrollBox.current.querySelector('.vertical-wrap');
            const horizontalWrapDom = scrollBox.current.querySelector('.horizontal-wrap');
            (verticalWrapDom && (status || !mouseIsDown.current)) && (verticalWrapDom.style.display = status ? 'block' : 'none');
            (horizontalWrapDom && (status || !mouseIsDown.current)) && (horizontalWrapDom.style.display = status ? 'block' : 'none'); 
        }  
    }

    /*******************************垂直start*************************** */

    //垂直滚动条拖动
    const verMouseOver = useCallback((e) => {
        e.preventDefault();
        // const posInfor = scrollBox.current.getBoundingClientRect();
        const currentPos = e.clientY - posInfor.y - verticalItemMouseDomPos.current;
        //const verItemDomHeight = 60; // verItemDom.current.clientHeight

        //垂直item 位置
        let verItemTop;
        if(currentPos >=0){
            verItemTop = (currentPos > barState.tableClientHeight - verItemDomHeight) ? (barState.tableClientHeight - verItemDomHeight) : currentPos;
        }else{
            verItemTop = 0;
        }
       
        verItemDom.current.style.top = verItemTop  + 'px';

        //
        const s_top = verItemTop / (barState.tableClientHeight - verItemDomHeight) * (barState.tableScrollHeight - barState.tableClientHeight);
        scrollBox.current.scrollTop = s_top;
        scrollInfor.current.y = s_top;
        scrollInfor.current.y_percent = verItemTop / (barState.tableClientHeight - verItemDomHeight);
        handleScrollFrame();

    },[barState]);

    const verMouseDown = useCallback((e) => {

        mouseIsDown.current = true;
        
        verticalItemMouseDomPos.current = e.clientY - e.target.getBoundingClientRect().y;

        posInfor = scrollBox.current.getBoundingClientRect()

        //设置bar item 鼠标移入 高度
        verItemDom.current.style.width = hoverBarHeight + 'px'

        //e.target.addEventListener('mousemove',verMouseOver);
        document.addEventListener('mousemove',verMouseOver);

    },[barState]);

    function verMouseEnter(e){
        e.target.style.width = hoverBarHeight + 'px';
    }


    /*******************************!end*************************** */


    /**************水平-start************ */
    //滚动条拖动
    const horMouseOver = useCallback((e) => {
        e.preventDefault();
        // const horItemDomWidth = horItemDom.current.clientWidth;
        // const posInfor = scrollBox.current.getBoundingClientRect();
        const currentPos = e.clientX - posInfor.x - horticalItemMouseDomPos.current;

        //水平item 位置
        let horItemLeft;
        if(currentPos >=0){
            horItemLeft = (currentPos >= barState.tableClientWidth - horItemDomWidth) ? (barState.tableClientWidth - horItemDomWidth) : currentPos;
        }else{
            horItemLeft = 0;
        }
        horItemDom.current.style.left = horItemLeft  + 'px';

        //
        const s_left = horItemLeft / (barState.tableClientWidth) * barState.tableScrollWidth;
    
        scrollBox.current.scrollLeft = s_left;

        scrollInfor.current.x = s_left;
        scrollInfor.current.x_percent = horItemLeft / (barState.tableClientWidth - horItemDomWidth);
        handleScrollFrame();
    },[barState]);

    const horMouseDown = useCallback((e) => {

        mouseIsDown.current = true;
        horticalItemMouseDomPos.current = e.clientX - e.target.getBoundingClientRect().x;
        posInfor = scrollBox.current.getBoundingClientRect();

        //设置bar item 鼠标移入 高度
        horItemDom.current.style.height = hoverBarHeight + 'px'

        document.addEventListener('mousemove',horMouseOver);

    },[barState]);

    function horMouseEnter(e){
        e.target.style.height = hoverBarHeight + 'px';
    }

    /**************水平-end************ */

    function handleMouseLeave (attr,e){
        !mouseIsDown.current && (e.target.style[attr]= barItem + 'px')
    }

    const documentRemoveMouseup = useCallback((e) => {
        mouseIsDown.current = false;

        scrollContainerHandleMouseEnter(scrollContainer.current.contains(e.target) ? true : false);

        horItemDom.current && (horItemDom.current.style.height =  barItem + 'px');
        verItemDom.current && (verItemDom.current.style.width = barItem + 'px');
        document.removeEventListener('mousemove',verMouseOver);
        document.removeEventListener('mousemove',horMouseOver);
    },[barState]);


    //监听窗口
    useEffect(() => {

        //取消document monseUp
        document.addEventListener('mouseup',documentRemoveMouseup,{passive: true});
        window.addEventListener('resize',computerBarConfig,{passive: true});

        //处理编辑表格时，存在的异常问题
        if(scrollInfor.current.x != scrollBox.current.scrollLeft){
            scrollBox.current.scrollLeft = scrollInfor.current.x;
        }

        return () => {
            window.removeEventListener('resize',computerBarConfig);
            window.removeEventListener('mouseup',documentRemoveMouseup);
            scrollBox.current && scrollBox.current.removeEventListener('scroll',handlemouseWheel);
        }
    },[barState]);

    // 鼠标换轮滚动
    const handlemouseWheel = useCallback((e) => {
        e.preventDefault();

        const currentScrollTop = e.target.scrollTop;
        const currentScrollLeft = e.target.scrollLeft;

        scrollInfor.current.y = currentScrollTop;
        scrollInfor.current.y_percent = currentScrollTop / (barState.tableScrollHeight - barState.tableClientHeight);
        if(scrollInfor.current.y_percent > 1){
            return;
        }

        verItemDom.current && (verItemDom.current.style.top = (currentScrollTop * barState.tableClientHeight) / barState.tableScrollHeight  + 'px');
        horItemDom.current && (horItemDom.current.style.left = (currentScrollLeft * barState.tableClientWidth) / barState.tableScrollWidth  + 'px');

        
        scrollInfor.current.x = currentScrollLeft;
        scrollInfor.current.x_percent = currentScrollLeft / (barState.tableScrollWidth - barState.tableClientWidth);
        scrollInfor.current.x_percent = scrollInfor.current.x_percent > 0.995 ? 1 : scrollInfor.current.x_percent;

        handleScrollFrame();
        
        return;

        //onwheel 事件写法，废弃
        // let deltaY = 125; //e.deltaY
        let deltaY = 150; //e.deltaY
        if(e.deltaY < 0){
            deltaY = -150;
        }
        //清除没必要 计算
        mouseWheelSetTime.current && clearTimeout(mouseWheelSetTime.current);

        const t_scroll = barState.tableClientHeight - verItemDomHeight;
        const v_top = parseFloat(verItemDom.current.style && verItemDom.current.style.top || 0);
        let dis = v_top + (deltaY / barState.tableScrollHeight * barState.tableClientHeight) * 1.9;
        
        //减少没必要的计算
        if(!verItemDom.current || (v_top == t_scroll && dis > v_top) || (v_top==0 && dis < 0)){
            return;
        }
        
        e.preventDefault();

        if(dis > t_scroll){
            dis =  t_scroll
        }
        if(dis < 0){
            dis = 0;
        }

        mouseWheelSetTime.current = setTimeout(() => {
            verItemDom.current.style.top = dis  + 'px';
            
            const scrollDis = dis / (barState.tableClientHeight - verItemDomHeight) * (barState.tableScrollHeight - barState.tableClientHeight);
            scrollBox.current.scrollTop = scrollDis;   

            scrollInfor.current.y = scrollDis;
            scrollInfor.current.y_percent = dis / (barState.tableClientHeight - verItemDomHeight);
            handleScrollFrame();
        },100);
        
    }) 

    //计算滚动条 高/宽度
    // type?string h:水平  v:垂直
    const getAttr = useCallback((type) => {
        let result;
        if(type == 'v'){
            const h = tableClientHeight / tableScrollHeight * tableClientHeight;
            // result = h > 30 ? h : 30;
            result = h;
            verItemDomHeight = result;
            return result;
        }
        horItemDomWidth = tableClientWidth * tableClientWidth / tableScrollWidth;
        return horItemDomWidth;

    },[barState]);

    //组件滚动条计算 和 监听鼠标滑轮滚动
    useEffect(() => {
        
        computerBarConfig();
        if(verItemDom.current || horItemDom.current){
            scrollBox.current.removeEventListener('scroll',handlemouseWheel);
            scrollBox.current.addEventListener('scroll',handlemouseWheel,{passive: false});
        }  
    });

    return (
        <div className="cus-scroll-box" ref={scrollContainer} onMouseEnter={scrollContainerHandleMouseEnter.bind(this,true)} onMouseLeave={scrollContainerHandleMouseEnter.bind(this,false)}>
            <div className="cus-scroll-wrap" ref={scrollBox} style={{...style,height:`${height + 17}px`}}>
                {children}
                {(tableScrollHeight > tableClientHeight) && (
                    <div className="vertical-wrap" style={{display:autoHide ? 'none' : 'block'}}>
                        {/* style={{height:(tableClientHeight / tableScrollHeight * 100) + '%'}} */}
                        <div ref={verItemDom} onMouseLeave={handleMouseLeave.bind(null,'width')} onMouseEnter={verMouseEnter} onMouseDown={verMouseDown} className="item" style={{width:barItem+'px',height:getAttr('v') + 'px'}}></div> 
                    </div>
                )}
                {(tableScrollWidth > tableClientWidth) && (
                    <div className="horizontal-wrap" style={{display:autoHide ? 'none' : 'block'}}>
                        <div ref={horItemDom} onMouseLeave={handleMouseLeave.bind(null,'height')} onMouseEnter={horMouseEnter} onMouseDown={horMouseDown} className="item" style={{height:barItem+'px',width:getAttr('h') + 'px'}}></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Scrollbar;

