KISSY.add("Project/UI/TipSwitch", function (S) {
    return function (callback) {
        var TipSwitch = {};
        var Changer = S.one("#TypeSelect select").on("change", function () {
            var index = this.selectedIndex;
            TipSwitch.Switch(index);
        });
        var Tips = S.all("#Tips .Tip");
        var Select = null;
        var SelectC = S.one("#Selected");
        var CTip = Tips.all(".content li").on("click", function () {
            var self = S.one(this);
            var tp = self.attr("tp");
            var ti = self.attr("ti");
            var text = self.one("span").text();
            AddToSel(tp, ti, text);
        });
        var TTipBt = Tips.all(".tcontent .bt").on("click", function () {
            var self = S.one(this);
            var tp = self.attr("tp");
            var ti = self.parent(".tcontent").one(".tx").val();
            AddToSel(tp, ti, ti);
        });
        var AddToSel = function (tp, ti, text) {
            if (ti != "" && text != "") {
                var addSelect = {};
                var SelectCOnly = SelectC.one(".only");
                addSelect["tp"] = tp;
                addSelect["ti"] = ti;
                Select = addSelect;
                if (!SelectCOnly) {
                    SelectCOnly = S.one("<li class='only'><a></a><span class='cancel'></span></li>");
                    SelectCOnly.one(".cancel").on("click", function () {
                        SelectCOnly.remove();
                        Select = null;
                        if (callback && S.isFunction(callback.select)) {
                            callback.select(Select);
                        }
                    });
                    SelectC.one("ul").append(SelectCOnly);
                }
                SelectCOnly.one("a").text(text);
                if (callback && S.isFunction(callback.select)) {
                    callback.select(Select);
                }
            }
        };
        TipSwitch.Switch = function (index) {
            if (S.isNumber(index) && Tips.length > index) {
                Tips.addClass("hidden").item(index).removeClass("hidden");
            }
            return TipSwitch;
        };
        TipSwitch.GetSelect = function () {
            return Select;
        };
    }
});