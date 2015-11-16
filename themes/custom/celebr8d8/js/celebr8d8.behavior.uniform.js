/**
 * @file
 * Uniform form elements.
 *
 */
(function ($, Drupal) {

  /**
   * Behaviour to add Uniform to the form elements.
   */
  Drupal.behaviors.uniform = {
    attach: function () {
      var formItems = [
        'select',
        '.form-file',
        'input:radio',
        'input:checkbox'
      ];

      $(formItems.join(', ')).uniform();

      // Add after focus class for text items.
      //$('.form-text, .form-textarea').once('afterFocus', function () {
      //  $(this).blur(function () {
      //    $(this).addClass('after-focus');
      //  });
      //});
    }
  };

})(jQuery, Drupal);
