function byId(id){ return document.getElementById(id); }
function byClass(classe){ return document.getElementsByClassName(classe); }
function byTag(tag){ return document.getElementsByTagName(tag); }
function byName(name){ return document.getElementByName(name); }

function setPropBy(selectorType, selectorName, index, prop, valor) {
    
    switch(selectorType){
        case "id": elements = [byId(selectorName)]; break;
        case "class": elements = byClass(selectorName); break;
        case "tag": elements = byTag(selectorName); break;
        case "name": elements = byName(selectorName); break;
        case "children": elements = byId(selectorName).children; break;
    }
    
    if(index){
        index.forEach(function (el) {
            elements[el].style[prop] = valor;
        });
    } else {
        for(el = 0; el < elements.length; el++){
             elements[el].style[prop] = valor;
        }
    }
}

function getPropBy(selectorType, selectorName, index, prop) {
    var props;
    switch(selectorType){
        case "id": elements = byId(selectorName); break;
        case "class": elements = byClass(selectorName); break;
        case "tag": elements = byTag(selectorName); break;
        case "name": elements = byName(selectorName); break;
        case "children": elements = byId(selectorName).children; break;
    }
    
    if(index){
        index.forEach(function (el) {
            props[el] = elements[el].style[prop];
        });
    } else {
        for(el = 0; el < elements.length; el++){
              props[el] = elements[el].style[prop];
        }
    }
    
    return props;
    
}

window.addEventListener("load", initTheme);
var btnScroll;
function initTheme(){
    /*byId("loading").style.opacity = "0";
    setTimeout(function(){
        document.body.style.overflow = "auto";
        document.body.removeChild(byId("loading"));
    }, 1000);
    */

    initFixedMenu();
    //resize();
    
    initCalendario();
}

//window.addEventListener("resize", resize);
//function resize(){
//    setPropBy("tag", "section", [0], "height", (window.innerHeight - menutopo.offsetHeight) + "px");
//    setPropBy("tag", "section", [1, 2, 3], "top", menutopo.offsetHeight + 20 + "px");
//}


//MENU FIXO
var btnScroll, menutopo
function initFixedMenu(){

    btnScroll = byClass("btn-scroll");
    btnEvent("add", btnScroll, rlSuave);

    menutopo = byId("menu-principal");
    var menutopoTop = menutopo.offsetTop;
    window.addEventListener("scroll", function(){ 
        saveScrollAtual();
        if(pageYOffset < menutopo.offsetHeight ){ 
            menutopo.setAttribute("class", "unfixed"); 
                setPropBy("tag", "section", [0], "top", 0);

        } 
        else if(pageYOffset >= menutopo.offsetHeight ){ 
            menutopo.setAttribute("class", "fixed"); 
            setPropBy("tag", "section", [0], "top", menutopo.offsetHeight + "px");
        }
     })
}
                            

//ativa ou desativa os botões (da variavel btnScroll) da rolagem suave
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

    if(e.target != undefined){ destino = e.target.getAttribute("name");}
    else { destino = e;}

    btnEvent("remove", btnScroll, rlSuave);
    
    //até onde o scroll vai
    scrollDestino = (byId(destino).offsetTop - parseInt(window.getComputedStyle(menutopo, null).height));
    //de onde o scroll comeca
    scrollInicio = scrollAtual;
    
    //diferenca entre inicio e destino
    var diferenca = scrollDestino - scrollAtual;

    scrollInterval = setInterval(function(){
        currentTime += increment;
        scrolling = Math.easeInOutQuad(currentTime, scrollInicio, diferenca, duracao);
        window.scrollTo(0, scrolling);

        if (currentTime > duracao) {
            btnEvent("add", btnScroll, rlSuave);
            currentTime = 0;
            clearInterval(scrollInterval);
            window.scrollTo(0, scrollDestino);
        }
    }, 20);
}

//t = current time, b = start value, c = change in value, d = duration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d; 	return c*t*t + 1 + b;
};

function saveScrollAtual(){ scrollAtual = pageYOffset; }

//CALENDARIO

function initCalendario(){
    
    btnEvent("add", byClass("event"), showEvento);
    descricaoEvento = byId("descricao-evento");
    criarLembrar = byId("criar-agenda-lembrete-senha");
}

function showEvento(e){
    var data = e.target.getAttribute("data-date");
    descricaoEvento.setAttribute("class", "show");
    
}

function hideEvento(){  descricaoEvento.setAttribute("class", "hide"); }


function showCriarLembrar(){ criarLembrar.setAttribute("class", "show"); }
function hideCriarLembrar(){ criarLembrar.setAttribute("class", "hide"); }