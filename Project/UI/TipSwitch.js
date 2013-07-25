KISSY.add("Project/UI/TipSwitch",function(S){
    return function(){
        var TipSwitch = {};
        var Changer = S.one("#TypeSelect select").on("change",function(){
            var index = this.selectedIndex;
            TipSwitch.Switch(index);
        });
        var Tips = S.all("#Tips .Tip");

        TipSwitch.Switch = function(index){
            if(S.isNumber(index) && Tips.length > index){
                Tips.addClass("hidden").item(index).removeClass("hidden");
            }
            return TipSwitch;
        }
    }
})