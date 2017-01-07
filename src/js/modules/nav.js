
$(document).ready(function(){

  var $nav = $('ul.nav'),
      $navHeight = $nav.height(),
      $navigation = $('.navigation'),
      $header = $('header.header'),
      $headerHeight = $header.height();

      $(window).on('scroll', nav);

      function nav() {

        var $scrollTop = $(window).scrollTop(),
            $headerOffset = $header.offset().top,
            $currentOffset = ($headerOffset - $scrollTop) * (-1);

        if ( $currentOffset >= ($headerHeight / $navHeight) ) {
          $navigation.addClass('scroll');
        } else {
          $navigation.removeClass('scroll');
        }

      }

});
