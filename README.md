### 下载
------

```
npm i react-beautiful-scrollbar
```





### 使用方法：

------

```
npm i react-beautiful-scrollbar


import Scrollbar from 'react-beautiful-scrollbar';

export default APP(){

    function handleScroll(v){
    	console.log(v);
    }
    
	return(
		<Scrollbar height={ number || 'auto'} handleScroll={handleScroll}>
                
	    </Scrollbar>
	)
}
```



### props

------

| 名称             | 默认值     | 描述                   | 类型           |
| ---------------- | ---------- | ---------------------- | -------------- |
| *children*       | 无         |                        |                |
| *style*          | {}         | 样式                   | object         |
| *height*         | ‘auto’     | 滚动区域高度           | number/string  |
| *handleScroll*   | 无（函数） | 滚动函数               | function(data) |
| *hoverBarHeight* | 9          | 鼠标进入，滚动条 高/宽 | number         |
| *barItem*        | 6          | 滚动条 高/宽 默认值    | number         |
| *autoHide*       | false      | 滚动条 支持自动显隐    | Boolean   |



### 方法

------

|      |      |      |      |
| ---- | ---- | ---- | ---- |
|      |      |      |      |
|      |      |      |      |
|      |      |      |      |
|      |      |      |      |
