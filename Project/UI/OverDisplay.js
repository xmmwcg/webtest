KISSY.add("Project/UI/OverDisplay",function(S){
    return function(){
        var OverDisplay = {};

        var OverDisplayElement = $("#OverDisplay");
        var ParentCon = OverDisplayElement.parent();
        var Historybar = OverDisplayElement.find(".Bar ul");
        //var CloseBt = OverDisplayElement.one(".close").on("click",function(){
        //    Close();
        //});
        var frame = OverDisplayElement.find("#DisplayFrame");
        var histroylist = [];
        var isOpen = false;

        var OpenFrame = function(src){
            frame.prop("src",src);
        };
        var SetHistory = function(src,name){
            Historybar.find("li").removeClass("cur");
            var hist = {};
            hist.src = src;
            hist.name = name;
            hist.element = $("<li class='cur' onclick='return Display.Back(this);'><span>" + name + "</span></li>");
            if(!isOpen){
                histroylist = [];
                Historybar.empty();
            }
            histroylist.push(hist);
            Historybar.append(hist.element);
        };
        var Open = function(src,name){
            var PWidth = ParentCon.width();
            SetWidth();
            SetHistory(src,name);
            OpenFrame(src);
            if(!isOpen){
                OverDisplayElement.show();
                OverDisplayElement.stop().animate({"left": 0},500,function(){
                    isOpen = true;
                });
            }
        };
        var History = function(self){
             for(var i = 0 ; i <histroylist.length ; i++ ){
                if(histroylist[i].element[0] == self){
                    histroylist.splice(i + 1);
                    var baritems = Historybar.find("li");
                    baritems.eq(i).addClass("cur");
                    OpenFrame(histroylist[i].src);
                    for(var j = i + 1; j < baritems.length ; j++){
                        baritems.eq(j).remove();
                    }
                    break;
                }
             }
        };
        var Close = function(){
            var PWidth = ParentCon.width();
            histroylist = [];
            SetWidth();
            if(isOpen){
                OverDisplayElement.stop().animate({"left": PWidth},500,function(){
                    isOpen = false;
                    OverDisplayElement.hide();
                });
            }
        };
        //绑定事件
        $(window).bind("resize",function(){
            SetWidth();
        });
        //
        var SetWidth = function(){
            var PWidth = ParentCon.width();
            var OLeft = isOpen ? 0 : PWidth;
            OverDisplayElement.css({"left": OLeft + "px","width": PWidth + "px"});
        };
        OverDisplay.Open = function(src,name){
            Open(src,name);
        };
        OverDisplay.Back = function(self){
            if(!$(self).hasClass("cur")){
                History(self);
            }
        };
        return OverDisplay;
    }
},{
    requires:["Project/UI/OverDisplay/OverDisplay.css"]
});