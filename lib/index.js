"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./style/style.less");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var verItemDomHeight = 30;
var horItemDomWidth = 0;

function Scrollbar(_ref) {
  var children = _ref.children,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 'auto' : _ref$height,
      handleScroll = _ref.handleScroll,
      _ref$hoverBarHeight = _ref.hoverBarHeight,
      hoverBarHeight = _ref$hoverBarHeight === void 0 ? 9 : _ref$hoverBarHeight,
      _ref$barItem = _ref.barItem,
      barItem = _ref$barItem === void 0 ? 6 : _ref$barItem,
      _ref$autoHide = _ref.autoHide,
      autoHide = _ref$autoHide === void 0 ? false : _ref$autoHide;
  //最外层的容器dom
  var scrollContainer = (0, _react.useRef)(null); //储存垂直 鼠标 按下的初始位置

  var verticalItemMouseDomPos = (0, _react.useRef)(0); //储存水平 鼠标 按下的初始位置

  var horticalItemMouseDomPos = (0, _react.useRef)(0); //容器dom

  var scrollBox = (0, _react.useRef)(null);
  var posInfor = null; //右侧滚动条 dom

  var verItemDom = (0, _react.useRef)(null); //底部滚动条 dom

  var horItemDom = (0, _react.useRef)(null);
  var horizontalWrap = (0, _react.useRef)(null);
  var verticalWrap = (0, _react.useRef)(null); //储存滚动条滚动信息

  var scrollInfor = (0, _react.useRef)({
    x: 0,
    y: 0,
    x_percent: 0,
    y_percent: 0
  }); //记录鼠标是否mousedown

  var mouseIsDown = (0, _react.useRef)(false); //鼠标滚动定时器

  var mouseWheelSetTime = (0, _react.useRef)(null); //

  var scrolling = (0, _react.useRef)(false);
  var lastViewScrollLeft = (0, _react.useRef)(0);
  var lastViewScrollTop = (0, _react.useRef)(0);
  var detectScrollingInterval = (0, _react.useRef)(null); //滚动条显示变量

  var _useState = (0, _react.useState)({
    tableClientWidth: 0,
    tableScrollWidth: 0,
    tableClientHeight: 0,
    tableScrollHeight: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      barState = _useState2[0],
      setBarState = _useState2[1];

  var tableClientWidth = barState.tableClientWidth,
      tableScrollWidth = barState.tableScrollWidth,
      tableClientHeight = barState.tableClientHeight,
      tableScrollHeight = barState.tableScrollHeight; //滚动条 配置计算

  var computerBarConfig = function computerBarConfig() {
    var table_client_width = scrollBox.current.clientWidth;
    var table_scroll_width = scrollBox.current.scrollWidth;
    var table_client_height = scrollBox.current.clientHeight;
    var table_scroll_height = scrollBox.current.scrollHeight;

    if (table_client_width != tableClientWidth || table_scroll_width != tableScrollWidth || table_client_height != tableClientHeight || table_scroll_height != tableScrollHeight) {
      setBarState({
        tableClientWidth: table_client_width,
        tableScrollWidth: table_scroll_width,
        tableClientHeight: table_client_height,
        tableScrollHeight: table_scroll_height
      });
      setTimeout(function () {
        //处理 水平滚动条 从 有 到 无
        if (table_client_width == table_scroll_width) {
          scrollInfor.current.x = 0;
          scrollInfor.current.x_percent = 0;
        }

        scrollInfor.current.x = scrollInfor.current.x_percent * (table_scroll_width - table_client_width);
        scrollInfor.current.y = scrollInfor.current.y_percent * (table_scroll_height - table_client_height);
        var horItemDom_left = scrollInfor.current.x_percent * (table_client_width - horItemDomWidth);
        var verItemDom_top = scrollInfor.current.y_percent * (table_client_height - verItemDomHeight);
        scrollBox.current && (scrollBox.current.scrollLeft = scrollInfor.current.x);
        scrollBox.current && (scrollBox.current.scrollTop = scrollInfor.current.y);
        horItemDom.current && (horItemDom.current.style.left = horItemDom_left + 'px');
        verItemDom.current && (verItemDom.current.style.top = verItemDom_top + 'px');
        handleScrollFrame();
      }, 0);
    }
  }; //对外开放滚动信息


  function handleScrollFrame() {
    handleScroll && handleScroll(_objectSpread({}, scrollInfor.current));
  } //


  function scrollContainerHandleMouseEnter(status, type) {
    if (status && type) {
      computerBarConfig();
    } //


    if (autoHide) {
      verticalWrap.current && (status || !mouseIsDown.current) && (verticalWrap.current.style.display = status ? 'block' : 'none');
      horizontalWrap.current && (status || !mouseIsDown.current) && (horizontalWrap.current.style.display = status ? 'block' : 'none');
    }
  }

  function handleScrollStart() {
    computerBarConfig();
  }

  function handleScrollStop() {}

  function detectScrolling() {
    if (scrolling.current) return;
    scrolling.current = true;
    handleScrollStart();
    detectScrollingInterval.current = setInterval(function () {
      var _scrollInfor$current = scrollInfor.current,
          x = _scrollInfor$current.x,
          y = _scrollInfor$current.y;

      if (lastViewScrollLeft.current === x && lastViewScrollTop.current === y) {
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


  var verMouseOver = (0, _react.useCallback)(function (e) {
    e.preventDefault(); // const posInfor = scrollBox.current.getBoundingClientRect();

    var currentPos = e.clientY - posInfor.y - verticalItemMouseDomPos.current; //const verItemDomHeight = 60; // verItemDom.current.clientHeight
    //垂直item 位置

    var verItemTop;

    if (currentPos >= 0) {
      verItemTop = currentPos > barState.tableClientHeight - verItemDomHeight ? barState.tableClientHeight - verItemDomHeight : currentPos;
    } else {
      verItemTop = 0;
    }

    verItemDom.current.style.top = verItemTop + 'px'; //

    var s_top = verItemTop / (barState.tableClientHeight - verItemDomHeight) * (barState.tableScrollHeight - barState.tableClientHeight);
    scrollBox.current.scrollTop = s_top;
    scrollInfor.current.y = s_top;
    scrollInfor.current.y_percent = verItemTop / (barState.tableClientHeight - verItemDomHeight);
    handleScrollFrame();
  }, [barState]);
  var verMouseDown = (0, _react.useCallback)(function (e) {
    mouseIsDown.current = true;
    verticalItemMouseDomPos.current = e.clientY - e.target.getBoundingClientRect().y;
    posInfor = scrollBox.current.getBoundingClientRect(); //设置bar item 鼠标移入 高度

    verItemDom.current.style.width = hoverBarHeight + 'px'; //e.target.addEventListener('mousemove',verMouseOver);

    document.addEventListener('mousemove', verMouseOver);
  }, [barState]);

  function verMouseEnter(e) {
    computerBarConfig();
    e.target.style.width = hoverBarHeight + 'px';
  }
  /*******************************!end*************************** */

  /**************水平-start************ */
  //滚动条拖动


  var horMouseOver = (0, _react.useCallback)(function (e) {
    e.preventDefault(); // const horItemDomWidth = horItemDom.current.clientWidth;
    // const posInfor = scrollBox.current.getBoundingClientRect();

    var currentPos = e.clientX - posInfor.x - horticalItemMouseDomPos.current; //水平item 位置

    var horItemLeft;

    if (currentPos >= 0) {
      horItemLeft = currentPos >= barState.tableClientWidth - horItemDomWidth ? barState.tableClientWidth - horItemDomWidth : currentPos;
    } else {
      horItemLeft = 0;
    }

    horItemDom.current.style.left = horItemLeft + 'px'; //

    var s_left = horItemLeft / barState.tableClientWidth * barState.tableScrollWidth;
    scrollBox.current.scrollLeft = s_left;
    scrollInfor.current.x = s_left;
    scrollInfor.current.x_percent = horItemLeft / (barState.tableClientWidth - horItemDomWidth);
    handleScrollFrame();
  }, [barState]);
  var horMouseDown = (0, _react.useCallback)(function (e) {
    mouseIsDown.current = true;
    horticalItemMouseDomPos.current = e.clientX - e.target.getBoundingClientRect().x;
    posInfor = scrollBox.current.getBoundingClientRect(); //设置bar item 鼠标移入 高度

    horItemDom.current.style.height = hoverBarHeight + 'px';
    document.addEventListener('mousemove', horMouseOver);
  }, [barState]);

  function horMouseEnter(e) {
    computerBarConfig();
    e.target.style.height = hoverBarHeight + 'px';
  }
  /**************水平-end************ */


  function handleMouseLeave(attr, e) {
    !mouseIsDown.current && (e.target.style[attr] = barItem + 'px');
  }

  var documentRemoveMouseup = (0, _react.useCallback)(function (e) {
    mouseIsDown.current = false;
    scrollContainer.current && scrollContainerHandleMouseEnter(scrollContainer.current.contains(e.target) ? true : false, false);
    horItemDom.current && (horItemDom.current.style.height = barItem + 'px');
    verItemDom.current && (verItemDom.current.style.width = barItem + 'px');
    document.removeEventListener('mousemove', verMouseOver);
    document.removeEventListener('mousemove', horMouseOver);
  }, [barState]); //监听窗口

  (0, _react.useEffect)(function () {
    //取消document monseUp
    document.addEventListener('mouseup', documentRemoveMouseup, {
      passive: true
    });
    window.addEventListener('resize', computerBarConfig, {
      passive: true
    }); //处理编辑表格时，存在的异常问题

    if (scrollInfor.current.x != scrollBox.current.scrollLeft) {
      scrollBox.current.scrollLeft = scrollInfor.current.x;
    }

    return function () {
      window.removeEventListener('resize', computerBarConfig);
      window.removeEventListener('mouseup', documentRemoveMouseup);
      scrollBox.current && scrollBox.current.removeEventListener('scroll', handlemouseWheel);
      clearInterval(detectScrollingInterval.current);
    };
  }, [barState]); // 鼠标换轮滚动

  var handlemouseWheel = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    var currentScrollTop = e.target.scrollTop;
    var currentScrollLeft = e.target.scrollLeft;
    scrollInfor.current.y = currentScrollTop;
    scrollInfor.current.y_percent = currentScrollTop / (barState.tableScrollHeight - barState.tableClientHeight);

    if (scrollInfor.current.y_percent > 1) {
      return;
    }

    verItemDom.current && (verItemDom.current.style.top = currentScrollTop * barState.tableClientHeight / barState.tableScrollHeight + 'px');
    horItemDom.current && (horItemDom.current.style.left = currentScrollLeft * barState.tableClientWidth / barState.tableScrollWidth + 'px');
    scrollInfor.current.x = currentScrollLeft;
    scrollInfor.current.x_percent = currentScrollLeft / (barState.tableScrollWidth - barState.tableClientWidth);
    scrollInfor.current.x_percent = scrollInfor.current.x_percent > 0.995 ? 1 : scrollInfor.current.x_percent;
    detectScrolling();
    handleScrollFrame();
  }); //计算滚动条 高/宽度
  // type?string h:水平  v:垂直

  var getAttr = (0, _react.useCallback)(function (type) {
    var result;

    if (type == 'v') {
      var h = tableClientHeight / tableScrollHeight * tableClientHeight; // result = h > 30 ? h : 30;

      result = h;
      verItemDomHeight = result;
      return result;
    }

    horItemDomWidth = tableClientWidth * tableClientWidth / tableScrollWidth;
    return horItemDomWidth;
  }, [barState]); //组件滚动条计算 和 监听鼠标滑轮滚动

  (0, _react.useEffect)(function () {
    computerBarConfig();

    if (verItemDom.current || horItemDom.current) {
      scrollBox.current.removeEventListener('scroll', handlemouseWheel);
      scrollBox.current.addEventListener('scroll', handlemouseWheel, {
        passive: false
      });
    }
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "cus-scroll-box",
    ref: scrollContainer,
    onClick: function onClick() {
      computerBarConfig();
    },
    onMouseEnter: scrollContainerHandleMouseEnter.bind(this, true, true),
    onMouseLeave: scrollContainerHandleMouseEnter.bind(this, false, true)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "cus-scroll-wrap",
    ref: scrollBox,
    style: _objectSpread(_objectSpread({}, style), {}, {
      height: "".concat(height + 17, "px")
    })
  }, children, tableScrollHeight > tableClientHeight && /*#__PURE__*/_react["default"].createElement("div", {
    className: "vertical-wrap",
    ref: verticalWrap,
    style: {
      display: autoHide ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    ref: verItemDom,
    onMouseLeave: handleMouseLeave.bind(null, 'width'),
    onMouseEnter: verMouseEnter,
    onMouseDown: verMouseDown,
    className: "item",
    style: {
      width: barItem + 'px',
      height: getAttr('v') + 'px'
    }
  })), tableScrollWidth > tableClientWidth && /*#__PURE__*/_react["default"].createElement("div", {
    className: "horizontal-wrap",
    ref: horizontalWrap,
    style: {
      display: autoHide ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    ref: horItemDom,
    onMouseLeave: handleMouseLeave.bind(null, 'height'),
    onMouseEnter: horMouseEnter,
    onMouseDown: horMouseDown,
    className: "item",
    style: {
      height: barItem + 'px',
      width: getAttr('h') + 'px'
    }
  }))));
}

var _default = Scrollbar;
exports["default"] = _default;