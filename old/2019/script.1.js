window.addEventListener("load", function(){
    byId("bg-image").style.opacity = 1;
})

function load(){
    var togglesPalestra = byClass("timeline__toggle");
    var contents = byClass("timeline__content");

    for (var t in togglesPalestra){
        var toggle = togglesPalestra[t];

        if(typeof(toggle) == "object"){
            toggle.addEventListener("click", function(e){
                var parent = e.target.parentNode;
                var classe = parent.getAttribute("class");

                if(classe.indexOf("show") <= 0){
                    parent.setAttribute("class", classe + " show")
                    
                    for (var c in contents){
                        if(typeof(contents[c]) == "object" && contents[c] != parent){
                            var contentsClass = contents[c].getAttribute("class");
                            contents[c].setAttribute("class", contentsClass.replace(' show',''));
                        }
                    }

                } else {
                    parent.setAttribute("class", classe.replace(' show',''))
                }
            })
        }
    }

    byId("menu-link").addEventListener("click", function(e) {
        e.preventDefault();
        
        var isOpen = getClass("menu").indexOf("open") > -1;
        byId("hamburger").setAttribute("class", isOpen ? "" : "open");
        byId("menu").setAttribute("class", isOpen ? "" : "open");
    });

    sizes();
};

window.addEventListener("resize", sizes);

function sizes(){
    var headerHeight = byId("header").offsetHeight;
    var footerHeight = byId("footer").offsetHeight;
    
    byId("header").style.height = headerHeight + "px";

    var pageWidth = window.innerWidth + 1;
    var pageHeight = window.innerHeight - 2 - headerHeight - footerHeight;
    
    var content = byId("content");
    content.style.height = "";
    content.style.width = pageWidth + "px";
    content.style.height = (pageHeight + 2) + "px";

    var inicial = byId("inicial");    
    inicial.style.height = "";
    inicial.style.height = (pageHeight + 2) + "px";
    
    var bg = byId("bg-image");
    bg.style.height = "";
    bg.style.width = (pageWidth + 30) + "px";
    bg.style.height = (pageHeight + 30) + "px";
}

function show(section){    
    
    byId("hamburger").setAttribute("class", "");
    byId("menu").setAttribute("class", "");

    if(byId("menu-item-" + section).getAttribute("class") == "menu-item text-dark-green open"){
        hide(section);
        return true;
    }

    ['sobre', 'como-chegar', 'programacao', 'parceiras', 'apoio'].forEach(function(secao){
        var menuItem = byId("menu-item-" + secao);
        if(menuItem && secao != section){
            hide(secao);
        }
    });

    inicial.style.opacity = 0;

    byId("content").setAttribute("class", "open");
    
    byId("menu-item-" + section).setAttribute("class", "menu-item text-dark-green open");
    byId("content-" + section).style.visibility = "visible";
    
    setTimeout(function(){ 
        inicial.style.visibility = "hidden" 
    }, 200);
}

function hide(section){

    inicial.style.visibility = "visible"; 
    inicial.style.opacity = 1;

    byId("menu-item-" + section).setAttribute("class", "menu-item text-dark-green");
    byId("content").setAttribute("class", "");
    
    setTimeout(function(){ 
        byId("content-" + section).style.visibility = "hidden"; 
        byId("content").style.visibility = "hidden"; 
    }, 200);
   
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