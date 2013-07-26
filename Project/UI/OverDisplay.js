KISSY.add("Project/UI/OverDisplay",function(S){
    return function(){
        var OverDisplay = {};

        var OverDisplayElement = S.one("#OverDisplay");
        var ParentCon = OverDisplayElement.parent();
        var BackBt = OverDisplayElement.one(".Bt").on("click",function(){
            Close();
        });
        var isOpen = false;

        var Open = function(){
            var PWidth = ParentCon.width();
            SetWidth();
            if(!isOpen){
                OverDisplayElement.show();
                OverDisplayElement.stop().animate({"left": 0},{duration:0.5,complete:function(){
                    isOpen = true;
                }});
            }
        }
        var Close = function(){
            var PWidth = ParentCon.width();
            SetWidth();
            if(isOpen){
                OverDisplayElement.stop().animate({"left": PWidth},{duration:0.5,complete:function(){
                    isOpen = false;
                    OverDisplayElement.hide();
                }});
            }
        }
        var SetWidth = function(){
            var PWidth = ParentCon.width();
            var OLeft = isOpen ? 0 : PWidth;
            OverDisplayElement.css({"left": OLeft + "px","width": PWidth + "px"});
        }
        OverDisplay.Open = function(){
            Open();
        }
        return OverDisplay;
    }
},{
    requires:["Project/UI/OverDisplay/OverDisplay.css"]
})