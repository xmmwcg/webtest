KISSY.add("UI/Scroll",function(S,Scrolls){
    var Scroll = [];
    
    var FindTargetInScroll = function(Target){
        for(var i=0;i<Scroll.length;i++){
            var ScrollsNode = Scroll[i];
            if(ScrollsNode.Target.getDOMNode() == Target.getDOMNode()){
                return ScrollsNode;
            }            
        }
        return undefined;
    }
    
    var AddScroll = function(Target){
        var NewAdd = [];
        if(typeof(Target) == "string"){
            Target = S.all(Target);
            Array.prototype.push.call(NewAdd,AddScroll(Target));
            return NewAdd;
        }
        if(Target.length > 1){
            Target.each(function(Node){
                var Found = FindTargetInScroll(Node);
                if(Found){
                    
                }else{
                    NewAdd.push(AddScroll(Node));
                }
                
            });
            return NewAdd;        
        }else{
            var Found = FindTargetInScroll(Target);
            if(Found){
                return Found;
            }else{
                var NewScroll = new Scrolls(Target);
                Scroll.push(NewScroll);
                return NewScroll;
            }
            
        }
    }
    
    return AddScroll;
},{
	requires: ["UI/Scroll/Scrolls","UI/Scroll/Scroll.css"]
})
KISSY.add("UI/Scroll/Scrolls",function(S){
    return function(Target){
        var Scrolls = {};
        //私有属性
        var Parent = Target.parent();
        var hasShadow = Target.hasClass("Shadow");
        var Element = {};
        //公有属性
        Scrolls.Target = Target;
        //私有方法
        var Resize = function(){
            SetScroll();
            
            if(hasShadow)
            {
                SetShadow(); 
            }         
        }
        var SetScroll = function(){
            var ScrollTop = Scrolls.Target.scrollTop();
            var ScrollLeft = Scrolls.Target.scrollLeft();
            
            var ParentWidth = Parent.width();
            var ParentHeight = Parent.height();
            
            var ScrollWidth = Scrolls.Target.getDOMNode().scrollWidth;
            var ScrollHeight = Scrolls.Target.getDOMNode().scrollHeight;
            
            var Width = Scrolls.Target.width();
            var Height = Scrolls.Target.height();
            
            var Offset = Scrolls.Target.offset();
            
            var ScrollBarHeight = Height * Height / ScrollHeight
            var ScrollBarTop = ScrollTop * Height / ScrollHeight
            
            if(Height == ScrollHeight)
            {
                Element["Scroll"].hide();
            }
            else
            {
                Element["Scroll"].show();
            }
            
            Element["Scroll"].css({"top" : Offset.top + "px" ,"left" : (Offset.left + Width - 8) + "px" , "height" : Height + "px"});
            Element["ScrollBar"].css({"top" : ScrollBarTop + "px" , "height" : ScrollBarHeight + "px"});
        }
        var SetShadow = function(){       
            var ScrollTop = Scrolls.Target.scrollTop();
            var ScrollLeft = Scrolls.Target.scrollLeft();
            
            var ParentWidth = Parent.width();
            var ParentHeight = Parent.height();
            
            var ScrollWidth = Scrolls.Target.getDOMNode().scrollWidth;
            var ScrollHeight = Scrolls.Target.getDOMNode().scrollHeight;
            
            var Width = Scrolls.Target.width();
            var Height = Scrolls.Target.height();
            
            var Offset = Scrolls.Target.offset();
            var Top = Offset.top;
            var Bottom = Offset.top + Height - 5;
            
            if(Height <= ScrollHeight)
            {
                if(ScrollTop == 0)
                {
                    Element["TopSadow"].addClass("OnTop");
                }
                else
                {
                    Element["TopSadow"].removeClass("OnTop");
                }
                if(ScrollTop + Height >= ScrollHeight)
                {
                    Element["BottomSadow"].addClass("OnBottom");
                }
                else
                {
                    Element["BottomSadow"].removeClass("OnBottom");
                }
            }
            Element["TopSadow"].css("top",Top + "px");
            Element["BottomSadow"].css("top",Bottom + "px");
        }
        var SetScrollTop = function(ScrollTop){
            Scrolls.Target.scrollTop(ScrollTop);
            SetScroll();
            if(hasShadow){
                SetShadow();
            }
        }
        
        Element["Scroll"] = S.one(document.createElement("div")).addClass("Scroll");
        Element["ScrollBar"] = S.one(document.createElement("div")).addClass("ScrollBar");        
        Element["Scroll"].append(Element["ScrollBar"]);        
        Scrolls.Target.append(Element["Scroll"]);
        
        if(hasShadow)
        {   
            Element["TopSadow"] = S.one(document.createElement("div")).addClass("TopSadow");
            Element["BottomSadow"] = S.one(document.createElement("div")).addClass("BottomSadow");
            Scrolls.Target.append(Element["TopSadow"]).append(Element["BottomSadow"]);
        }
        
        Resize(); 
        Element["ScrollBar"].stop(true).fadeOut();
        
        S.one(window).on("resize",function(){
            Resize();
        })
        
        Scrolls.Target.on("mouseenter",function(){
            Element["ScrollBar"].stop(true).fadeIn();
        })
        Scrolls.Target.on("mouseleave",function(){
            Element["ScrollBar"].stop(true).fadeOut();
        })
        Scrolls.Target.on("mousewheel",function(){
            var moved = event.wheelDelta > 0 ? -1 : 1;  
            var ScrollTop = Scrolls.Target.scrollTop() + 8 *  moved;
            SetScrollTop(ScrollTop);
        })
        
        return Scrolls;
    };
})