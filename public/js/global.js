function updateCartBadge () {
  const total = cartLS.list().length;
  if (total > 0) {
    $('#cart-badge').html(total);
    $('#cart-badge').removeClass('hide');
  }
}

function handleLogoutClick (event) {
  event.preventDefault();
  cartLS.destroy();
  window.location = '/auth/logout';
}

function currencyFormatter (value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
}

$(document).ready(function () {
  $('#dropdown-item-logout').on('click', handleLogoutClick);
  $('#sidebar-profile [itemid="logout"]').on('click', handleLogoutClick);

  // Add smooth scrolling to all links
  $("a").on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      const hash = this.hash;

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

  const searchModal = $('#searchModal');
  const searchInput = $('#global-input-search');

  searchModal.on('shown.bs.modal', function () {
    searchInput.focus();
    searchInput.select();
  });
});
