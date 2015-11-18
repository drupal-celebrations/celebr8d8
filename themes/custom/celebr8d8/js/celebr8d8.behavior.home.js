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
      if (/[?&]field_category_target_id=/.test(location.href)) {
        $(window).load(function () {
          var $target = $('#block-celebr8d8-content'),
            targetOffset = $target.offset().top;

          $('html, body').animate({
            scrollTop: targetOffset
          }, 800);
        });
      }

      $('.block--views-blockfilms-main-featured .more-link a').once().click(function (e) {
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

  /**
   * Behaviour for Magnific Popup.
   */
  Drupal.behaviors.magnificPopup = {
    attach: function () {
      $('#block-celebr8d8-homepage-header .field--name-body a').magnificPopup({type: 'iframe'});
    }
  };

  /**
   * Behaviour for Film Teaser matchHeights.
   */
  Drupal.behaviors.filmMatchHeights = {
    attach: function () {
      var matchHeightSelectors = [
        '.node--type-film.node--view-mode-teaser .node__main > h2',
        '.node--type-film.node--view-mode-teaser .node__content'
      ];

      $.each(matchHeightSelectors, function (i) {
        if ($(matchHeightSelectors[i]).length) {
          $(matchHeightSelectors[i]).matchHeight(true);
        }
      });
    }
  };

})(jQuery, Drupal);
