function byId(id){ return document.getElementById(id); }
function byClass(classe){ return document.getElementsByClassName(classe); }

var content;
window.onload = function(){
    document.getElementById("loading").style.opacity = 0;
    document.getElementById("loading").style.visibility = "hidden";

    setTimeout(function(){
        body.removeChild(document.getElementById("loading"));
    }, 1000);

    var numbers = [];
    var fotos = document.getElementsByClassName("foto");

    while(numbers.length < fotos.length){
        var random = Math.floor(Math.random()*25) + 1;
        if(numbers.indexOf(random) > -1) continue;
        numbers.push(random);
    }

    for (var f = 0; f < fotos.length; f++){
        fotos[f].style.backgroundImage = "url('img/" + numbers[f] + ".png')";
    }

    btnScroll = byClass("menu-item");
    btnEvent("add", btnScroll, rlSuave);

    content = byId("conteudo");
    content.addEventListener("scroll", function() {
        scrollAtual = content.scrollTop;
    });
}

function btnEvent(tipo, btns, funcao){
    switch(tipo){
        case "add": for(b=0; b<btns.length; b++){
            btns[b].addEventListener("click", funcao);
        } break;
        case "remove": for(b=0; b<btns.length; b++){ btns[b].removeEventListener("click", funcao); } break;
    }
}

// ROLAGEM SUAVE
var scrollInterval, destino;
var scrollAtual = 0, scrollDestino = 0, scrolling = 0, duracao = 1250, currentTime = 0, increment = 20;
function rlSuave(e){
    e.preventDefault();

    content.parentNode.scrollIntoView();

    if(e.target != undefined){ destino = e.target.getAttribute("name");}
    else { destino = e;}

    btnEvent("remove", btnScroll, rlSuave);

    //até onde o scroll vai
    scrollDestino = (byId(destino).offsetTop);
    //de onde o scroll comeca
    scrollInicio = scrollAtual;

    //diferenca entre inicio e destino
    var diferenca = scrollDestino - scrollAtual;

    scrollInterval = setInterval(function(){
        currentTime += increment;
        scrolling = Math.easeInOutQuad(currentTime, scrollInicio, diferenca, duracao);
        content.scrollTo(0, scrolling);

        if (currentTime > duracao) {
            btnEvent("add", btnScroll, rlSuave);
            currentTime = 0;
            clearInterval(scrollInterval);
            content.scrollTo(0, scrollDestino);
        }
    }, 20);
}

//t = current time, b = start value, c = change in value, d = duration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d; 	return c*t*t + 1 + b;
};

function description(id, close){
    var children = byId(id).children[0].children;

    for(var child in children){
        if(!isNaN(child)){
            if(children[child].style.maxHeight == "9999px" || close == true){
                var maxHeight = 0;
                var paddingTop = 0;
            } else {
                var maxHeight = "9999px";
                var paddingTop = "10px";
            }
            children[child].style.maxHeight = maxHeight;
            children[child].style.paddingTop = paddingTop;
        }
    }

    if(!close) {
        ["workshop1", "workshop2", "workshop3", "palestra", "mesa-redonda"].forEach(function (item) {
            if (item != id) {
                description(item, true);
            }
        });
    }
}
