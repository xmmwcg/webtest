KISSY.add("Project/UI/OverDisplay",function(S){
    return function(){
        var OverDisplay = {};

        var OverDisplayElement = S.one("#OverDisplay");
        var ParentCon = OverDisplayElement.parent();
        //var CloseBt = OverDisplayElement.one(".close").on("click",function(){
        //    Close();
        //});
        //var BackBt = OverDisplayElement.one(".back").hide().on("click",function(){
        //    History();
        //});
        var frame = OverDisplayElement.one("#DisplayFrame");
        var histroylist = [];
        var isOpen = false;

        var OpenFrame = function(src){
            frame.prop("src",src);
        }
        var SetHistory = function(src){
            if(isOpen){
                histroylist.push(src);
            }else{
                histroylist = [];
                histroylist.push(src);
            }
        }
        var CountHistory = function(){
            if(histroylist.length > 1){
                BackBt.show();
            }else{
                BackBt.hide();
            }
        }
        var Open = function(src){
            var PWidth = ParentCon.width();
            SetWidth();
            SetHistory(src);
            CountHistory();
            OpenFrame(src);
            if(!isOpen){
                OverDisplayElement.show();
                OverDisplayElement.stop().animate({"left": 0},{duration:0.5,complete:function(){
                    isOpen = true;
                }});
            }
        }
        var History = function(){
            if(histroylist.length > 1){
                var PWidth = ParentCon.width();
                histroylist.splice(histroylist.length - 1);
                var src = histroylist.slice(histroylist.length - 1);
                SetWidth();
                CountHistory();
                OpenFrame(src);
            }
        }
        var Close = function(){
            var PWidth = ParentCon.width();
            histroylist = [];
            SetWidth();
            if(isOpen){
                OverDisplayElement.stop().animate({"left": PWidth},{duration:0.5,complete:function(){
                    isOpen = false;
                    OverDisplayElement.hide();
                }});
            }
        }
        //绑定事件
        S.one(window).on("resize",function(){
            SetWidth();
        })
        //
        var SetWidth = function(){
            var PWidth = ParentCon.width();
            var OLeft = isOpen ? 0 : PWidth;
            OverDisplayElement.css({"left": OLeft + "px","width": PWidth + "px"});
        }
        OverDisplay.Open = function(src){
            Open(src);
        }
        OverDisplay.GetHistory = function(){
            return histroylist;
        }
        return OverDisplay;
    }
},{
    requires:["Project/UI/OverDisplay/OverDisplay.css"]
})