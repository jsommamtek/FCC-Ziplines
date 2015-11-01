
/* APPLICATION JAVASCRIPT */

// Set min height of each container to the window height to fill the screen
$(".mt-content-container").css("min-height", $(window).height());

// Make sure to close collapsed nav menu after click of menu item
$(document).on('click','.navbar-collapse.in',function(event) {
    if( $(event.target).is('a') ) {
        $(this).collapse('hide');
    }
});

// Toggle Fade in/out top-nav link on scroll from/to home container
$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.mt-scroll-up-link').fadeIn();
    } else {
        $('.mt-scroll-up-link').fadeOut();
    }
});