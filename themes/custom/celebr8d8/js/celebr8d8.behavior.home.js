/**
 * @file
 * Home JS.
 *
 */
(function ($, Drupal) {

  /**
   * Behaviour for Homepage scroll anchor.
   */
  Drupal.behaviors.homePageJump = {
    attach: function () {
      $('.block--views-blockfilms-main-featured').once().click(function (e) {
        e.preventDefault();

        var $target = $('#block-celebr8d8-content'),
          targetOffset = $target.offset().top;

        $('html, body').animate({
          scrollTop: targetOffset
        }, 1000);
      });
    }
  };

  /**
   * Behaviour for Homepage view filters.
   */
  Drupal.behaviors.homeViewFilters = {
    attach: function () {
      var $filters = $('.view--films-main.view-display--all .view__filters'),
        filterOpenClass = 'toggle--filters--open';

      // Function to close/open filters.
      function manualToggleFilters() {
        if (matchMedia('(min-width: 626px)').matches) {
          if ($('.toggle--filters').not('.toggle--filters--open').length) {
            $filters.show();
          }
        }
      }
      
      $('.view--films-main.view-display--all').once()
        .find('.view__filters').before('<a class="toggle toggle--filters" href="#"><span>Filters</span></a>')
        .prev('.toggle').click(function (e) {
          e.preventDefault();

          if ($(this).hasClass(filterOpenClass)) {
            $(this).removeClass(filterOpenClass);
            $filters.slideUp();
          }
          else {
            $(this).addClass(filterOpenClass);
            $filters.slideDown();
          }
        });

      $(window).on('resize', Drupal.debounce(manualToggleFilters, 20)).trigger('resize');
    }
  };

})(jQuery, Drupal);
