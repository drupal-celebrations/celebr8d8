/**
 * @file
 * Logo swap.
 *
 */
(function ($, Drupal) {

  /**
   * Behaviour to switch the logo at certain viewports.
   */
  Drupal.behaviors.logoSwap = {
    attach: function () {
      var plainLogo = 'logo.svg',
        compactLogo = 'logo-compact.svg';

      function switchLogo() {
        var compact = matchMedia('(max-width: 960px)').matches,
          $logo = $('.branding__site-logo img'),
          newLogo = plainLogo,
          oldLogo = compactLogo,
          src = $logo.attr('src');

        if (compact) {
          newLogo = compactLogo;
          oldLogo = plainLogo;
        }

        if (src.indexOf(newLogo) < 0) {
          var newPath = src.replace(oldLogo, newLogo);
          $logo.attr('src', newPath);
        }
      }

      // Width check.
      $(window).on('resize', Drupal.debounce(switchLogo, 150)).trigger('resize');
    }
  };

})(jQuery, Drupal);
