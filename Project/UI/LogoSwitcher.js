KISSY.add("UI/LogoSwitcher",function(S){
    return function(ParentUnitCode){
        var LogoPath = "../../images/Logos/";
        var LogoFullPath = LogoPath + ParentUnitCode + "/Logo.png"
        S.one("#Logo").append("<img src='"+ LogoFullPath +"' />");
    };
})