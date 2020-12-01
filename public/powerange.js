$("[name=range]").on("change", function () {
    $("[for=range]").val(this.value + "  puntos");
}).trigger("change");

$("[name=range1]").on("change", function () {
    $("[for=range1]").val(this.value + "  puntos");
}).trigger("change");

$("[name=range2]").on("change", function () {
    $("[for=range2]").val(this.value + "   puntos");
}).trigger("change");

$("[name=range3]").on("change", function () {
    $("[for=range3]").val(this.value + "   puntos");
}).trigger("change");

function funcionAsociadaBoton() {
    window.location = "http://www.google.com";
}

