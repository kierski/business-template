$('.ourservices__slider').owlCarousel({
	smartSpeed: 1150,
	dots: false,
	loop: true,
	nav: true,
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

$('.owl-carousel').owlCarousel({
	smartSpeed: 1150,
	dots: false,
	loop: true,
	nav: false,
	responsive: {
		0: {
			items: 1
		},
		600: {
			items: 1
		},
		1000: {
			items: 2
		}
	}
});
