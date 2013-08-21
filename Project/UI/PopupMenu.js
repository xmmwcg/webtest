KISSY.add("Project/UI/PopupMenu",function(S){
    return function(Selector,MenuSelector,Cfg){
        var Popup = {};
        var SelectorEles,MenuSelectorEles;
        var DefaultCfg = {
            popupMethod : "click",
            autoHideOnMouseLeave : false
        };
        $.extend(DefaultCfg,Cfg);
        var ShowMenu = function(index){
            if($.isNumeric(index)){
                var MenuSelectorEle = MenuSelectorEles.eq(index);
                if(MenuSelectorEle.length > 0){
                    SetMenuPos(index);
                }
            }
        };
        var SetMenuPos = function(index){
            var SelectorEle = SelectorEles.eq(index);
            var MenuSelectorEle = MenuSelectorEles.eq(index);
            var SelectorEleOffset = SelectorEle.offset();
            var SelectorEleOuterWidth = SelectorEle.outerWidth();
            var SelectorEleOuterHeight = SelectorEle.outerHeight();
            var SelectorEleTop = SelectorEleOffset.top;
            var SelectorEleLeft = SelectorEleOffset.left;
            var SelectorEleRight = SelectorEleLeft + SelectorEleOuterWidth;
            var SelectorEleBottom = SelectorEleTop + SelectorEleOuterHeight;

        };
        var LoadSelector = function(){
            if(typeof(Selector) == "string" && typeof(MenuSelector) == "string"){
                SelectorEles = $(Selector);
                MenuSelectorEles = $(MenuSelector);
                if(SelectorEles.length > 0 && MenuSelectorEles.length > 0){
                    //弹出方式集合
                    var popupMethods = "click mouseenter".split(" ");
                    //如果设置参数中的弹出方式在弹出方式集合中
                    if($.inArray(DefaultCfg.popupMethod,popupMethods)){
                        //绑定事件
                        SelectorEles.bind(DefaultCfg.popupMethod,function(){
                            //触发事件的元素序号
                            var SelectorIndex = SelectorEles.index(this);
                            //弹出菜单
                            ShowMenu(SelectorIndex);
                        })
                    }else{
                        throw "弹出方式设置错误";
                    }
                }else{
                    throw "木有找到目标或目标菜单菜单";
                }
            }else{
                throw "初始化需要选择器";
            }
        }();
        return Popup;
    }
});