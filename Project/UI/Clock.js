/*
 *时钟模块
 *方法：
 方法名：RefreshTime（刷新时钟）
 */
KISSY.add("Project/UI/Clock", function (S, Tool) {
    return function () {
        var Clock = {}, $ = S.one, Timer = null;
        Clock.Init = function () {
            Timer = setInterval(function () {
                Clock.RefreshTime()
            }, 1000);
            Clock.RefreshTime();
            return  Clock;
        }
        Clock.RefreshTime = function () {
            var NowData = new Date();
            var DateString = Tool.Str.FormatDateTime("yyyy年MM月dd日 EEE", NowData);
            var TimeString = Tool.Str.FormatDateTime("tt hh:mm:ss", NowData);

            $("#Clock").text(DateString + " " + TimeString);
        };
        return  Clock;
    }();
}, {
    requires: ["Project/Tool"]
})