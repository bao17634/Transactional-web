/**
 * Created by Administrator on 2017/9/28.
 */

function tanchu() {
    $(".tanchu").show();
    $("#footer").css("padding-right", "700px");

}
function guanbi() {
    $(".tanchu").removeClass("animated fadeInRight");
    $(".tanchu").addClass("animated fadeOutRight");
    setTimeout(function () {
        $(".tanchu").hide();
        $(".tanchu").removeClass("animated fadeOutRight");
        $(".tanchu").addClass("animated fadeInRight");
    }, 500)
    $("#footer").css("padding-right", "0px");
}



var small = false;
function demo() {
    if (small) {
        $("#left").css("width", "220px");
        $("#l_top").css("width", "220px");
        if ($("#left").css("width", "220px")) {
            $("#l_lie").css("text-align", "left");
            $(".li").css("padding-left", "20%")
        }
        $(".wz").css("display", "");
        $("#rootDiv").css("margin-left", "");
        $("#right").css("margin-left", "220px");

        small = false;
    } else {
        $("#left").css("width", "50px");
        $("#l_top").css("width", "50px");
        if ($("#left").css("width", "50px")) {
            $("#l_lie").css("text-align", "center");
            $(".li").css("padding-left", "0px")
        }
        $(".wz").css("display", "none");
        $("#rootDiv").css("margin-left", "-5px");
        $("#right").css("margin-left", "50px");
        small = true;
    }
}
