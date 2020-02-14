window.addEventListener("load", sizes);
window.addEventListener("resize", sizes);

function sizes(){
    var menuHeight = byId("menu").offsetHeight;
    var pageHeight = window.innerHeight ;
    
    var inicial = byId("inicial");
    inicial.style.height = "";
    inicial.style.height = (pageHeight- menuHeight) + "px";
    
}

function byId(id){
    return document.getElementById(id);
}

function byClass(classe){
    return document.getElementsByClassName(classe);
}

function getClass(id){
    return byId(id).getAttribute("class");
}