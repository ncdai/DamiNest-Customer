function updateCartBadge () {
  const total = cartLS.list().length;
  if (total > 0) {
    $('#cart-badge').html(total);
    $('#cart-badge').removeClass('hide');
  }
}

$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 100, function () {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }
  });

  updateCartBadge();
});
