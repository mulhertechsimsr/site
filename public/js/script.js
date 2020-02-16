let menuHeight;

const sizes = () => {
    menuHeight = byId("menu").offsetHeight;
    var pageHeight = window.innerHeight ;
    
    var inicial = byId("inicial");
    inicial.style.height = "";
    inicial.style.minHeight = (pageHeight) + "px"; 
    inicial.style.paddingTop = menuHeight + "px";

}

const setupMenu = () => {
  $(".btn-menu").click(() => { $(".menu").show(); });
  $(".btn-close").click(() => { $(".menu").hide(); });
  
  $('nav a').click( (e) => {
    e.preventDefault();
    var id = $(e.target).attr('href');
    console.log("id", id);

    if(id) {
      targetOffset = $(id).offset().top;
      $('html, body').animate({
        scrollTop: targetOffset - menuHeight
      },500);
    }
  });
}

window.addEventListener("load", () => {
  setupMenu();
  sizes();
});

window.addEventListener("resize", sizes);