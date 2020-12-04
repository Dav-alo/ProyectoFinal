// Retorna un entero aleatorio entre min (incluido) y max (excluido)
// ¡Usando Math.round() te dará una distribución no-uniforme!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
document.getElementById("math").innerHTML = getRandomInt(0,10);
document.getElementById("math1").innerHTML = getRandomInt(0,100);
document.getElementById("math2").innerHTML = getRandomInt(0,10);
document.getElementById("math3").innerHTML = getRandomInt(0,10);
document.getElementById("math4").innerHTML = getRandomInt(0,10);
document.getElementById("math5").innerHTML = getRandomInt(0,10);
document.getElementById("math6").innerHTML = getRandomInt(0,10);
document.getElementById("math7").innerHTML = getRandomInt(50,100);
document.getElementById("math8").innerHTML = getRandomInt(0,10);