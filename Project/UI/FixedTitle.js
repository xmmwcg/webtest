KISSY.add("UI/FixedTitle",function(S){         
    var settitle = function(id,title){
        var Split = title.split("@");
        var NewTitle = "";
        for(var i=0;i<Split.length;i++){
            if(Split[i].indexOf("!")>=0){
                Split[i] = Split[i].replace("!","");
                Split[i] = id.attr(Split[i]);
            }
            NewTitle +=  Split[i];
        }
        return NewTitle;
    }
    var init = function(id,title,Cfg){
        var Cfg = Cfg || {};
        var TitleContiner = S.one(document.createElement("div")).addClass("FixedTitle");
        var FixedTitle = {};
        
        var Parent = id.parent();
        if(Parent.getDOMNode() == document.body){
            Parent = S.one(window);
        }
        var GetPos = function(){
            var Pos = {};
            
            Pos.ScrollTop = Parent.scrollTop();
            Pos.ParentHeight = Parent.outerHeight();
            Pos.Offset = id.offset();
            Pos.Top = id.getDOMNode().offsetTop;
            Pos.Height = id.outerHeight();
            Pos.TitleOffset = TitleContiner.offset();
            Pos.TitleTop = TitleContiner.getDOMNode().offsetTop;
            Pos.TitleHeight = TitleContiner.outerHeight();
            return Pos;
        }
        FixedTitle.ScrollTitle = function(){
            var Children = TitleContiner.children();
            var Pos = GetPos();
            var TopAdd = Cfg.Top || 0;
            var InTop = Pos.ScrollTop + TopAdd;
            var UnderTop =  Pos.TitleTop + Pos.Height;
            var CanSee = FixedTitle.CanSeeTitle();
            
            if(CanSee == "in"){
                TitleContiner.css({"height":TitleContiner.outerHeight() + "px","width":TitleContiner.outerWidth() + "px"});
                Children.css({"top": InTop + "px","position": "absolute"});
                Children.addClass("FixedTitleMove");
            }else if(CanSee == "under"){               
                TitleContiner.css({"height":TitleContiner.outerHeight() + "px","width":TitleContiner.outerWidth() + "px"});
                Children.css({"top": UnderTop + "px","position": "absolute"});
            }else{
                Children.css({"top": "auto","position": "inherit"});
                TitleContiner.css({"height":"auto","width":"auto"});                                
                Children.removeClass("FixedTitleMove");
            }
        }
        FixedTitle.CanSeeTitle = function(){
            var Pos = GetPos();
            var VisiableTop = Pos.TitleTop;
            var VisiableBottom = Pos.TitleTop + Pos.Height;
            var TopAdd = Cfg.Top || 0;
            if(Pos.ScrollTop + TopAdd >= VisiableTop && Pos.ScrollTop + TopAdd <= VisiableBottom){
                return "in";
            }else if(Pos.ScrollTop > VisiableBottom){
                return "under";
            }
            return "up";
        }
        if(typeof(title) == "string"){
            title = settitle(id,title)
        }
        TitleContiner.append(title);
        TitleContiner.insertBefore(id);
        FixedTitle.ScrollTitle();
        Parent.on("scroll",function(){
            FixedTitle.ScrollTitle();
        })
        return FixedTitle;
    }
    var ToFixed = function(id,title,Cfg){
        $ = S.all;
        var Objs = $(id);
        var Fixeds = [];
        if(Objs.length > 1){
            Objs.each(function(e){
                var Fixed = new init(e,title,Cfg);
                Fixeds.push(Fixed);
            })
        }else if(Objs.length == 1){
            var Fixed = new init(Objs,title,Cfg);
            Fixeds.push(Fixed);
        }
        return Fixed;
    }
    return ToFixed;
})