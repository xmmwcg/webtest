KISSY.add("Project/UI/Resize",function(S){
    return function(){
        var Resize = {};
        var Resizer = S.one("#Resize");
        var Container = S.one(window);
        var MinWidth = 900;
        var MinHeight = 600;
        var ResizeUpdate = function(){
            var width = Container.width();
            var height = Container.height();
            width = width <= MinWidth ? MinWidth : width;
            height = height <= MinHeight ? MinHeight : height;
            Resizer.css({"width": width + "px" , "height": height + "px"});
        }
        Resizer.Update = function(){
            ResizeUpdate();
        }
        if(Resizer){
            Container.on("resize",function(){
                ResizeUpdate();
            });
            ResizeUpdate();
        }
        return Resize;
    }
})