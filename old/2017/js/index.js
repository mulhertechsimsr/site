$(document).ready(function() {

    $('#contact-form').parsley();

    // navigation click actions 
    $('.scroll-link').on('click', function(event) {
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 750);
    });

    function scrollToID(id, speed) {
        var offSet = 100;
        var targetOffset = $(id).offset().top - offSet;
        var mainNav = $('#main-nav');
        $('html,body').animate({scrollTop: targetOffset}, speed);
        if (mainNav.hasClass("open")) {
            mainNav.css("height", "1px").removeClass("in").addClass("collapse");
            mainNav.removeClass("open");
        }
    }
        
    wrapper = $(".tabs");
    tabs = wrapper.find(".tab");
    tabToggle = wrapper.find(".tab-toggle");

    function openTab() {
        var content = $(this).parent().next(".content"),
        activeItems = wrapper.find(".active");

        if (!$(this).hasClass('active')) {
            $(this).add(content).add(activeItems).toggleClass('active');
            wrapper.css('min-height', content.outerHeight());
        }
    };

    tabToggle.on('click', openTab);
    
    initFixedMenu();
});

//MENU FIXO
var btnScroll, menutopo
function initFixedMenu(){

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

function byId(id){ return document.getElementById(id); }
function byClass(classe){ return document.getElementsByClassName(classe); }
function byTag(tag){ return document.getElementsByTagName(tag); }
function byName(name){ return document.getElementByName(name); }
function saveScrollAtual(){ scrollAtual = pageYOffset; }
    
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