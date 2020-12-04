import $ from 'jquery';
//Funcion para el cambio de puntos dentro de Escogerpuntos.html 
//Ta raro como funcion xd 

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

function funcionbotonpersonaje() {
    window.location = "Estadisticas_de_personaje.html";

}

function funcionrazaclase() {
    window.location = "Escoger_clase.html";
}

function funcionclasepuntos() {
    window.location = "Escoger_Puntos.html";
}

function funcionregresar1() {
    window.location = "index.html";
}

function funcionregresar2() {
    //windows.location = "Escoger_raza.html";
    window.location = "Escoger_raza.html";
}

function funcionregresar3() {
    //windows.location = "Escoger_clase.html"
    window.location = "Escoger_clase.html";
}

function funcionregresar4() {
    //windows.location = "Escoger_clase.html"
    window.location = "Escoger_Puntos.html";
}

function funcionsubmit() {
    window.location = "administracion.html"
}



// Retorna un entero aleatorio entre min (incluido) y max (excluido)
// ¡Usando Math.round() te dará una distribución no-uniforme!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

$(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}