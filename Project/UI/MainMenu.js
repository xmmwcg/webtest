KISSY.add("UI/MainMenu/MenuItem",function(S){
    return function(MenuItemSetting,MenuGroup) 
    {
        var MenuItem = 
        {
            ItemName: undefined,
            ItemText: "未知",
            Src: "",
            Target: undefined,
            Sign: 0,
            isSelected: false,
            hasSign: false,
            BeforeSelected: undefined
        };
        S.mix(MenuItem, MenuItemSetting);
        
        MenuItem.MenuGroup = MenuGroup;
        MenuItem.isSelected = false;
        
        MenuItem.Element = {};
        MenuItem.Element["MenuLink"] = S.one(document.createElement("div")).addClass("MenuLink").data("MenuLink", MenuItem);
        MenuItem.Element["MenuLinkText"] = S.one(document.createElement("span")).text(MenuItem.ItemText);
        MenuItem.Element["MenuLink"].append(MenuItem.Element["MenuLinkText"]);
        /******************方法**********************/
        MenuItem.CreateSign = function(Sign) 
        {
            MenuItem.Sign = Sign;
            MenuItem.Element["LeftSign"] = S.one(document.createElement("em")).addClass("LeftSign").text(MenuItem.Sign);
            MenuItem.Element["MenuLink"].append(MenuItem.Element["LeftSign"]);
            
            MenuItem.SetSign(MenuItem.Sign);
        }
        
        MenuItem.SetSign = function(Sign) 
        {
            MenuItem.Sign = Sign;
            MenuItem.Element["LeftSign"].text(Sign);
            if (MenuItem.Sign == 0) 
            {
                MenuItem.Element["LeftSign"].hide();
            } 
            else 
            {
                MenuItem.Element["LeftSign"].show();
            }
        }
        MenuItem.SetSelected = function(isSelected) 
        {
            var CanSelected;
            if (!MenuItem.isSelected) 
            {
                if (S.isFunction(MenuItem.BeforeSelected)) 
                {
                    CanSelected = MenuItem.BeforeSelected(MenuItem);
                }
                if (CanSelected == undefined || CanSelected) 
                {
                    S.all(".MenuLink").removeClass("Selected").each(function() {
                        S.one(this).data("MenuLink").isSelected = false;
                    });
                    MenuItem.Element["MenuLink"].toggleClass("Selected", isSelected);
                    if (MenuItem.Target && MenuItem.Target.length > 0 && S.type(MenuItem.Src) == "string") 
                    {
                        MenuItem.Target.prop("src", MenuItem.Src);
                    }
                    MenuItem.isSelected = isSelected;
                }
            }
        }
        /********************************************/
        MenuItem.Element["MenuLink"].on("click",function() {
            MenuItem.SetSelected(!MenuItem.isSelected);
        })
        if (MenuItem.hasSign) 
        {
            MenuItem.CreateSign(MenuItem.Sign);
        }
        if (MenuItemSetting.isSelected) 
        {
            MenuItem.SetSelected(true);
        }
        
        return MenuItem;
    }
});
KISSY.add("UI/MainMenu/MenuGroup",function(S,MenuItem){
    return function(MenuGroupSetting,Menu) {
        var MenuGroup = {
            GroupName: undefined,
            GroupText: "未知",
            MenuItems: {}
        }
        S.mix(MenuGroup, MenuGroupSetting);
        
        MenuGroup.Menu = Menu;
        
        MenuGroup.Element = {};
        MenuGroup.Element["Menu"] = S.one(document.createElement("div")).addClass("Menu");
        MenuGroup.Element["MenuTitle"] = S.one(document.createElement("div")).addClass("MenuTitle");
        MenuGroup.Element["MenuTitleText"] = S.one(document.createElement("span")).text(MenuGroup.GroupText);
        MenuGroup.Element["MenuArea"] = S.one(document.createElement("div")).addClass("MenuArea");
        
        MenuGroup.Element["MenuTitle"].append(MenuGroup.Element["MenuTitleText"]);
        MenuGroup.Element["Menu"].append(MenuGroup.Element["MenuTitle"]).append(MenuGroup.Element["MenuArea"]);
        
        MenuGroup.AddManuItem = function(MenuItemSetting) 
        {
            var NewMenuItem = new MenuItem(MenuItemSetting, MenuGroup);
            MenuGroup.MenuItems[NewMenuItem.ItemName] = NewMenuItem;
            
            MenuGroup.Element["MenuArea"].append(NewMenuItem.Element["MenuLink"]);
            
            return NewMenuItem;
        }
        
        MenuGroup.LoadItems = function(MenuItemSettings) 
        {
            if (S.type(MenuItemSettings) == "array") 
            {
                for (var i = 0; i < MenuItemSettings.length; i++) 
                {
                    MenuGroup.AddManuItem(MenuItemSettings[i]);
                }
            }
        }
        
        MenuGroup.LoadItems(MenuGroup.MenuItems);
        
        return MenuGroup
    }
},{
	requires: ["UI/MainMenu/MenuItem"]
});

KISSY.add("UI/MainMenu",function(S,MenuGroup){
    return function() {
        var Menu = {};
        
        Menu.AddMenuGroup = function(MenuGroupSetting) 
        {
            var NewMenuGroup = new MenuGroup(MenuGroupSetting, Menu);
            
            Menu[NewMenuGroup.GroupName] = NewMenuGroup;
            
            S.one("#MainMenu").append(NewMenuGroup.Element.Menu);
            
            return NewMenuGroup;
        };
        Menu.LoadMenu = function(MenuGroupSettings) 
        {
            for (i in MenuGroupSettings) 
            {
                if (Object.prototype.hasOwnProperty.call(MenuGroupSettings, i)) 
                {
                    Menu.AddMenuGroup(MenuGroupSettings[i]);
                }
            }
        } 
        return Menu;
    }();
},{
	requires: ["UI/MainMenu/MenuGroup","UI/MainMenu/Menu.css"]
})