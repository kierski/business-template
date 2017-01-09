
$( document ).ready(function() {

  var btn = $('.header__btn');
  var section = $('.header').next().offset().top;

  btn.on('click', function(e) {
    e.preventDefault();
    $('body').animate({scrollTop: section}, 850);
  });

});
