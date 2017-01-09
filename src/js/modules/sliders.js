$( document ).ready(function() {

  $('.ourservices__slider').owlCarousel({
  	smartSpeed: 1150,
  	dots: false,
  	loop: true,
  	nav: true,
  	center: true,
  	margin: 15,
  	responsive: {
  		0: {
  			items: 1
  		},
  		600: {
  			items: 2
  		},
  		1000: {
  			items: 3
  		}
  	}
  });

  $('.clientsreview__slider').owlCarousel({
  	smartSpeed: 1150,
  	dots: false,
  	loop: true,
  	nav: false,
    margin: 40,
  	responsive: {
  		0: {
  			items: 1
  		},
  		1000: {
  			items: 2
  		}
  	}
  });


});
