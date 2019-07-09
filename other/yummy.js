$(document).ready(function(){

  $(".hours").click(function(e){
    $("html, body").animate({
      scrollTop: $('.reviewDiv').offset().top
    }, 'slow');
  });
  $(".menu").click(function(e){
    $("html, body").animate({
      scrollTop: $('.longScroll').offset().top
    }, 'slow');
  });
  $(".contact").click(function(e){
    $("html, body").animate({
      scrollTop: $('.footer').offset().top
    }, 'slow');
  });
});
