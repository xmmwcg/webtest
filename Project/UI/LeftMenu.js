//菜单管理及动画
KISSY.add("Project/UI/LeftMenu", function (S, Menu) {
    return function () {
        var LeftMenu = {};
        //私有属性
        var Menus = {};//菜单字典
        var SelectMenu = null;//当前显示的菜单实例
        ///*私有方法*/
        //增加菜单
        var AddMenus = function (i, e, callback) {
            Menus[i] = new Menu(i, e, LeftMenu, callback);
            return Menus[i];
        };
        //显示菜单（动画效果）
        var MenuShow = function (name) {
            if (SelectMenu == null || SelectMenu.GetName() != name) {
                var WillShow = LeftMenu.GetMenuByName(name);
                if (WillShow) {
                    var WillShowElement = $(WillShow.GetDomElement());
                    var WillShowWidth = WillShowElement.width();
                    WillShowElement.css("left", "-240px");
                    WillShowElement.stop(true, true).animate({"left": "0"}, {
                        speed: 250,
                        step: function (x) {
                            if (SelectMenu != null) {
                                var SelectMenuElement = $(SelectMenu.GetDomElement());
                                var left = WillShowWidth + x;
                                SelectMenuElement.css("left", left + "px");
                            }
                        },
                        complete: function () {
                            if (SelectMenu != null) {
                                var SelectMenuElement = $(SelectMenu.GetDomElement());
                                SelectMenuElement.css("left", "-240px");
                            }
                            SelectMenu = WillShow;
                        }});
                }
            }
        };
        ///*公有属性*/

        ///*公有方法*/
        //初始化
        LeftMenu.Init = function (selector, callback) {
            if (S.isPlainObject(selector)) {
                callback = selector;
                selector = undefined;
            }
            if (selector == undefined || typeof(selector) == "string") {
                selector = selector || "#LeftMenu .Menus";
            }
            S.all(selector).removeClass("hidden").each(function (e, i) {
                AddMenus(i, e, callback);
            });
            return LeftMenu;
        };
        /**
         * @return {undefined}
         */
        //通过名称得到菜单实例（字典中是序号索引，这里参数是名称），没找到就返回undefined
        LeftMenu.GetMenuByName = function (name) {
            for (index in Menus) {
                if (Object.hasOwnProperty.call(Menus, index)) {
                    if (Menus[index].GetName() == name) {
                        return Menus[index];
                    }
                }
            }
            return undefined;
        };
        //切换至相应名称的菜单（调用动画效果）
        LeftMenu.SwitchTo = function (name) {
            MenuShow(name);
            return LeftMenu;
        };
        return LeftMenu;
    }();
}, {
    requires: ["Project/UI/LeftMenu/Menus", "Project/UI/LeftMenu/LeftMenu.css"]
});
//菜单
KISSY.add("Project/UI/LeftMenu/Menus", function (S, Item) {
    return function (i, e, LeftMenu, callback) {
        var Menus = {};
        var index = i;//菜单序号
        var element = e;//菜单元素
        var name = element.attr("id");//菜单名
        //得到菜单序号
        Menus.GetIndex = function () {
            return index;
        };
        //得到菜单名称
        Menus.GetName = function () {
            return name;
        };
        //得到菜单node元素
        Menus.GetElement = function () {
            return element;
        };
        //得到菜单dom元素
        Menus.GetDomElement = function () {
            return element.getDOMNode();
        };
        //选项集合（数组）
        var Items = function () {
            var ItemsArray = [];
            element.all("li:not(.children)").each(function (Itemele, Itemind) {
                var NewItem = new Item(Itemind, Itemele, Menus, undefined, callback);
                ItemsArray.push(NewItem);
            });
            return  ItemsArray;
        }();
        return Menus;
    }
}, {
    requires: ["Project/UI/LeftMenu/Item"]
});
KISSY.add("Project/UI/LeftMenu/Item", function (S) {
    var Items = function (Itemind, Itemele, Menus, Parent, callback) {
        var Item = {};
       ///*私有属性*/
        var element = Itemele; //选项元素
        var index = Itemind; //选项序号
        var name = element.attr("id");//选项名称
        var menu = Menus;//所在菜单实例
        var parent = Parent; //父级实例（如果不是子菜单选项则为undefined）
        var haschildren = false;//是否拥有下级选项
        var ischildren = parent != undefined; //是否本身是下级选项
        //下级选项集合（如果没有就是空数组）
        var children = function () {
            var childrenArray = [];
            if (typeof(name) == "string") {
                menu.GetElement().all("[rel=" + name + "]").each(function (e, i) {
                    var NewChildrenItem = new Items(i, e, menu, Item, callback);
                    childrenArray.push(NewChildrenItem);
                })
            }
            haschildren = childrenArray.length > 0;
            return childrenArray;
        }();
        ///*添加事件*/
        element.on("click", function () {
            Item.Open();
            if (callback && S.isFunction(callback.click)) {
                callback.click(Item);
            }
        });
        //
        ///*私有方法*/
        //改变选项打开状态并显示下级菜单选项（拥有下级选项才有作用）
        var ChangeState = function () {
            if (haschildren) {
                var opensign = element.one(".openico");
                opensign.toggleClass("open");
                ToggleChildren(!opensign.hasClass("open"));
                if (callback && S.isFunction(callback.expend)) {
                    callback.expend(Item);
                }
            }
        };
        //打开选项所对应模块（没有下级选项才有作用）,打开的功能实现没有写在这里需要回调事件输入
        var Open = function () {
            if (!haschildren) {
                menu.GetElement().all("li").removeClass("selected");
                element.addClass("selected");
                if (callback && S.isFunction(callback.open)) {
                    callback.open(Item);
                }
            }
        };
        //隐藏或显示选项，需要自身为下级选项才会有作用
        var Toggle = function (togglev) {
            if (ischildren) {
                element.toggleClass("hidden", togglev);
            }
        };
        //隐藏或显示下级选项，需要拥有下级选项才会有作用
        var ToggleChildren = function (togglev) {
            if (haschildren) {
                for (var i = 0; i < children.length; i++) {
                    children[i].Toggle(togglev);
                }
            }
        };
        ///*公共属性*/
        Item.isChildren = ischildren;//公开是否是下级选项属性
        Item.hasChildren = haschildren;//公开是否拥有下级选项属性
        ///*公共方法*/
        //获得选项序号
        Item.GetIndex = function () {
            return index;
        };
        //获得选项名称，如果有id值
        Item.GetName = function () {
            return name;
        };
        //获得选项node元素
        Item.GetElement = function () {
            return element;
        };
        //获得选项dom元素
        Item.GetDomElement = function () {
            return element.getDOMNode();
        };
        //获得下级选项集合，如果没有返回空数组
        Item.GetChildren = function () {
            return children;
        };
        //公开隐藏或显示选项方法（自身是下级选项才有作用）
        Item.Toggle = function (togglev) {
            if (ischildren) {
                Toggle(togglev);
            }
        };
        //更改打开状态（拥有下级选项才有作用）
        Item.ChangeState = function () {
            ChangeState();
        };
        //根据是否含有下级分发时间类型的打开方法，如果含有下级则显示或隐藏下级，如果不含有下级则直接打开
        Item.Open = function () {
            if (haschildren) {
                ChangeState();
            } else {
                Open();
            }
        };
        return Item;
    };
    return Items;
});