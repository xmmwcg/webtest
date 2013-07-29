var GetTop = function () {
    var f = arguments.callee, w;
    if (!f.t) {
        try {
            w = window;
            f.t = w != parent ? (parent.GetTop ? parent.GetTop() : parent.parent.GetTop()) : w;
        } catch (e) {
            f.t = w;
        }
    }
    return f.t;
}