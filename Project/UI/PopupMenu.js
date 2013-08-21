KISSY.add("Project/UI/PopupMenu", function (S) {
    return function (Selector, MenuSelector, Cfg) {
        var Popup = {};
        var SelectorEles, MenuSelectorEles;
        var DefaultCfg = {
            popupMethod: "click",
            autoHideOnMouseLeave: false,
            selectorClass: "menuopen"
        };
        $.extend(DefaultCfg, Cfg);
        var BindMenuEvent = function (index) {
            var intreg = /^\d+$/;
            if ($.isNumeric(index) && intreg.test(index)) {
                var eventtype = DefaultCfg.autoHideOnMouseLeave ? "mousemove" : "click";
                var SelectorEle = SelectorEles.eq(index);
                var MenuSelectorEle = MenuSelectorEles.eq(index);
                $(document).bind(eventtype, function (event) {
                    if (SelectorEle[0] != event.target && !$.contains(SelectorEle[0], event.target) && !$.contains(MenuSelectorEle[0], event.target)) {
                        HideMenu(index);
                        UnBindEvent(event);
                    } else {
                        SetMenuPos(index);
                    }
                })
            } else {
                throw "序号必须为正整数";
            }
        };
        var UnBindEvent = function (event) {
            $(document).unbind(event);
        };
        var ShowMenu = function (index) {
            var intreg = /^\d+$/;
            if ($.isNumeric(index) && intreg.test(index)) {
                var MenuSelectorEle = MenuSelectorEles.eq(index);
                if (MenuSelectorEle.length > 0) {
                    SetMenuPos(index);
                }
            } else {
                throw "序号必须为正整数";
            }
        };
        var HideMenu = function (index) {
            var intreg = /^\d+$/;
            if ($.isNumeric(index) && intreg.test(index)) {
                var SelectorEle = SelectorEles.eq(index);
                var MenuSelectorEle = MenuSelectorEles.eq(index);
                SelectorEles.removeClass(DefaultCfg.selectorClass);
                MenuSelectorEle.hide();
            }
        };
        var SetMenuPos = function (index) {
            var SelectorEle = SelectorEles.eq(index);
            var MenuSelectorEle = MenuSelectorEles.eq(index);
            var SelectorEleOffset = SelectorEle.offset();
            var SelectorEleOuterWidth = SelectorEle.outerWidth();
            var SelectorEleOuterHeight = SelectorEle.outerHeight();
            var SelectorEleInnerWidth = SelectorEle.innerWidth();
            var SelectorEleInnerHeight = SelectorEle.innerHeight();
            var SelectorEleBorderLR = SelectorEleOuterWidth - SelectorEleInnerWidth;
            var SelectorEleBorderTB = SelectorEleOuterHeight - SelectorEleInnerHeight;
            var SelectorEleTop = SelectorEleOffset.top;
            var SelectorEleLeft = SelectorEleOffset.left;
            var SelectorEleRight = SelectorEleLeft + SelectorEleOuterWidth;
            var SelectorEleBottom = SelectorEleTop + SelectorEleOuterHeight;

            var MenuSelectorEleTop = SelectorEleBottom;
            var MenuSelectorEleLeft = SelectorEleLeft - SelectorEleBorderLR;

            SelectorEle.addClass(DefaultCfg.selectorClass);
            MenuSelectorEle.css({"left": MenuSelectorEleLeft + "px", "top": MenuSelectorEleTop + "px"}).show();
        };
        var LoadSelector = function () {
            if (typeof(Selector) == "string" && typeof(MenuSelector) == "string") {
                SelectorEles = $(Selector);
                MenuSelectorEles = $(MenuSelector);
                if (SelectorEles.length > 0 && MenuSelectorEles.length > 0) {
                    //弹出方式集合
                    var popupMethods = "click mouseenter".split(" ");
                    //如果设置参数中的弹出方式在弹出方式集合中
                    if ($.inArray(DefaultCfg.popupMethod, popupMethods) >= 0) {
                        //绑定事件
                        SelectorEles.bind(DefaultCfg.popupMethod, function () {
                            //触发事件的元素序号
                            var SelectorIndex = SelectorEles.index(this);
                            //弹出菜单
                            ShowMenu(SelectorIndex);
                            BindMenuEvent(SelectorIndex);
                        })
                    } else {
                        throw "弹出方式设置错误";
                    }
                } else {
                    throw "木有找到目标或目标菜单菜单";
                }
            } else {
                throw "初始化需要选择器";
            }
        }();
        return Popup;
    }
});