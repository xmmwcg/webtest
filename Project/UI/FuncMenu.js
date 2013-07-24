/*
*功能菜单
*方法：
*返回值：菜单实例
*/
KISSY.add("Project/UI/FuncMenu", function(S, FuncMenuItem) {
    return function() {
        var FuncMenu = {};
        //私有属性
        var MenuItems = {};//菜单按钮字典
        var ArrowLi = S.one("<li class='top_arrow'><div class='in_arrow'></div></li>"); //浮动指针
        var SelectItem = null; //当前被选择的按钮
        var CallBack = null;//回调函数（事件）
        //私有方法
        //让指针悬浮于某一位置，参数为坐标集
        var ArrowGoto = function(Pos) {
            ArrowLi.stop().animate({left: Pos.left + "px",width: Pos.width}, {duration: 0.25});
        }
        //增加菜单按钮，i是序号，e是元素，callback是回调事件
        var AddMenuItem = function(i,e,callback){
            MenuItems[i] = new FuncMenuItem(i,e,FuncMenu,callback);
            return MenuItems[i];
        }
        //公共方法
        //初始化
        FuncMenu.Init = function(selector,callback) {
            if(S.isPlainObject(selector)){
                callback = selector;
                selector = undefined;
            }
            if(selector == undefined || typeof(selector) == "string"){
                selector = selector || "#FuncMenu .MenuItem";
            }
            CallBack = callback;
            S.all(selector).each(function(e,i){
                AddMenuItem(i,e,callback);
            }).parent().append(ArrowLi);
            return FuncMenu;
        }
        //得到当前被选中的按钮实例
        FuncMenu.GetSelectItem = function(){
            return SelectItem;
        }
        //让指针悬浮到i按钮上方（不同于GoFrame，只是让指针去一下不改变当前被选按钮）
        FuncMenu.FloatTo = function(i){
            if(MenuItems[i]){
                ArrowGoto(MenuItems[i].GetPos());
            }
        }
        //选择i按钮，指针会去i按钮上方，并且记录当前被选按钮为i按钮
        FuncMenu.GoFrame = function(i) {
            if(MenuItems[i]){
                SelectItem = MenuItems[i];
                ArrowGoto(SelectItem.GetPos());
                if(CallBack && S.isFunction(CallBack.goframe)){
                    CallBack.goframe(SelectItem);
                }
            }
            return FuncMenu;
        }
        //去第一个按钮
        FuncMenu.GoFirst = function(){
            FuncMenu.GoFrame(0);
            return FuncMenu;
        }
        return FuncMenu;
    }();
}, {
    requires: ["Project/UI/FuncMenu/FuncMenuItem", "Project/UI/FuncMenu/FuncMenu.css"]
})
/*
*按钮
*方法：
    方法名：GetIndex（获得按钮序号）
    返回值：序号
    
    方法名：GetPos（获得模块按钮坐标位置）
    返回值：Pos（坐标对象）
    
*返回值：页面构造方法
*/
KISSY.add("Project/UI/FuncMenu/FuncMenuItem", function(S) {
    return function(i,e,menu,callback) {
        var FuncMenuItem = {};
        var parentmenu = menu;//所属菜单实例
        var index = i;//序号 为菜单实例中按钮字典的索引值
        var element = e;//按钮元素
        var name = element.attr("rel");//对应的模块名称
        //绑定事件
        element.on("click",function(){
            parentmenu.GoFrame(index);
            if(callback && S.isFunction(callback.click)){
                callback.click(FuncMenuItem);
            }
        });
        element.on("mouseover",function(){
            parentmenu.FloatTo(index);
            if(callback && S.isFunction(callback.mouseover)){
                callback.mouseover(FuncMenuItem);
            }
        });
        element.on("mouseout",function(){
            parentmenu.FloatTo(parentmenu.GetSelectItem().GetIndex());
            if(callback && S.isFunction(callback.mouseout)){
                callback.mouseout(FuncMenuItem);
            }
        })
        //
        //获得按钮序号
        FuncMenuItem.GetIndex = function() {
            return index;
        }
        //获得按钮名称
        FuncMenuItem.GetName = function() {
            return name;
        }
        //获得按钮的位置集合
        FuncMenuItem.GetPos = function() {
            var Width = element.width();
            var Height = element.height();
            var Offset = element.offset();
            var Left = Offset.left - 3;
            var Top = Offset.top;
            return {
                width: Width,
                height: Height,
                left: Left,
                top: Top
            }
        }
        return FuncMenuItem;
    }
})
