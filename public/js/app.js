$(document).ready(function() {
  $(window).scroll(function() {
    var top = $(window).scrollTop();
    if (top > 88) {
      $("header .nav").addClass("sticky");
    } else {
      $("header .nav").removeClass("sticky");
    }
  });
});
