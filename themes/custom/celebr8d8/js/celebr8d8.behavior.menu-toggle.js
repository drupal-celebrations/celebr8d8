/**
 * @file
 * Responsive navigation toggle.
 *
 */
(function ($, Drupal) {

  /**
   * Initialise the tabs JS.
   */
  Drupal.behaviors.menuToggle = {
    attach: function () {
      var $header = $('.region-header'),
        $nav = $('.region-navigation'),
        menuOpenClass = 'toggle--menu--open';

      // Function to close open menus.
      function manualToggleMenu() {
        if (matchMedia('(min-width: 961px)').matches) {
          if ($('.toggle--menu').not('.toggle--menu--open').length) {
            $nav.show();
          }
        }
      }

      // Add the menu toggle button.
      $header.once()
        .prepend('<a class="toggle toggle--menu" href="#">Toggle Menu</a>')
        .find('.toggle--menu')
        .click(function (e) {
          e.preventDefault();

          if ($(this).hasClass(menuOpenClass)) {
            $(this).removeClass(menuOpenClass);
            $nav.slideUp();
          }
          else {
            $(this).addClass(menuOpenClass);
            $nav.slideDown();
          }
        });

      $(window).on('resize', Drupal.debounce(manualToggleMenu, 20)).trigger('resize');
    }
  };

})(jQuery, Drupal);
