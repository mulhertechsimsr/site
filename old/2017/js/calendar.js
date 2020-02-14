$('.month-item, #marco, .day, .clickable').click(function(e){	
    var month = '#' + $(this).attr('id') + '-event';

    // genero l'effetto tocco material
    var parent, ink, d, x, y;
    parent = $('.view-year');
    //creo elemento .ink se non esiste
    if(parent.find(".ink").length == 0)
        parent.prepend("<span style='background:" + $(month).children('.title').css('background-color') + "' class='ink'></span>");

    ink = parent.find(".ink");
    //incase of quick double clicks stop the previous animation
    //ink.removeClass("animate");

    //setto dimensioni di .ink
    if(!ink.height() && !ink.width())
    {
        //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
        d = Math.max(parent.outerWidth(), parent.outerHeight());
        ink.css({height: d, width: d});
    }

    //get click coordinates
    //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
    x = e.pageX - parent.offset().left - ink.width()/2;
    y = e.pageY - parent.offset().top - ink.height()/2;

    //set the position and add class .animate
    ink.css({top: y+'px', left: x+'px'}).addClass("animate");

    $(month).delay(500).fadeIn();
    setTimeout(function(){
        $(month).children('.title').removeClass('active');
    }, 500);

});

function gobackDay(){
    $('.go-back-day').parent().parent('.view-day').fadeOut();
    setTimeout(function(){
        $('.view-day').children('.title').addClass('active');
    }, 500);
    setTimeout(function(){
        $('.view-month').children('.ink').removeClass('animate');
    }, 500);
    setTimeout(function(){
        $('.view-month').children('.ink').remove();
    }, 1000);
    
}

$('.go-back-month').click(function(e){
    $(this).parent().parent('.view-month').fadeOut();
    setTimeout(function(){
        $('.view-month').children('.title').addClass('active');
    }, 500);
    setTimeout(function(){
        $('.view-year').children('.ink').removeClass('animate');
    }, 500);
    setTimeout(function(){
        $('.view-year').children('.ink').remove();
    }, 1000);
});	