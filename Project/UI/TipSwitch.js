KISSY.add("Project/UI/TipSwitch", function (S) {
    return function (callback) {
        var TipSwitch = {};
        var Changer = $("#TypeSelect select").on("change", function () {
            var index = this.selectedIndex;
            TipSwitch.Switch(index);
        });
        var Tips = $("#Tips .Tip");
        var Select = null;
        var SelectC = $("#Selected");
        var CTip = Tips.find(".content li").on("click", function () {
            var self = $(this);
            var tp = self.attr("tp");
            var ti = self.attr("ti");
            var text = self.find("span").text();
            AddToSel(tp, ti, text);
        });
        var TTipBt = Tips.find(".tcontent .bt").on("click", function () {
            var self = $(this);
            var tp = self.attr("tp");
            var ti = self.parents(".tcontent").find(".tx").val();
            AddToSel(tp, ti, ti);
        });
        var AddToSel = function (tp, ti, text) {
            if (ti != "" && text != "") {
                var addSelect = {};
                var SelectCOnly = SelectC.find(".only");
                addSelect["tp"] = tp;
                addSelect["ti"] = ti;
                Select = addSelect;
                if (SelectCOnly.length == 0) {
                    SelectCOnly = $("<li class='only'><a></a><span class='cancel'></span></li>");
                    SelectCOnly.find(".cancel").on("click", function () {
                        SelectCOnly.remove();
                        Select = null;
                        if (callback && S.isFunction(callback.select)) {
                            callback.select(Select);
                        }
                    });
                    SelectC.find("ul").append(SelectCOnly);
                }
                SelectCOnly.find("a").text(text);
                if (callback && S.isFunction(callback.select)) {
                    callback.select(Select);
                }
            }
        };
        TipSwitch.Switch = function (index) {
            if (S.isNumber(index) && Tips.length > index) {
                Tips.addClass("hidden").eq(index).removeClass("hidden");
            }
            return TipSwitch;
        };
        TipSwitch.GetSelect = function () {
            return Select;
        };
    }
});