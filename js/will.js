/*global
  window
*/

(function () {
  'use strict';

  $(document).ready(function () {

    $('nav, nav a').hover(function () {
      $(this).find('.slide-in').toggleClass('hidden');
    }, function () {
      $(this).find('.slide-in').toggleClass('hidden');
    });

    $('nav a').click(function (e) {
      e.preventDefault();
      var target = this.hash,
        $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, 1200, 'easeInOutCubic', function () {
        window.location.hash = target;
      });
    });

    $('.slider').slider({full_width: true});

  });

}());