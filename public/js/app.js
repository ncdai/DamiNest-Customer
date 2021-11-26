/* eslint-disable */

// $(document).ready(function () {
//   $(window).scroll(function () {
//     const top = $(window).scrollTop()
//     if (top > 88) {
//       $('header .nav').addClass('sticky')
//     } else {
//       $('header .nav').removeClass('sticky')
//     }
//   })
// })

$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 100, function() {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
