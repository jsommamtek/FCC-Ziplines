/* APPLICATION JAVASCRIPT */

/* Set the height of each section container to the hight of the current window
 * to suppor full screen scrolling sections on page
*/

// Set min height of each container to the window height to fill the screen
$(".mt-content-container").css("min-height", $(window).height());

// Make sure to close collapsed nav menu after click of menu item
$(document).on('click','.navbar-collapse.in',function(event) {
    if( $(event.target).is('a') ) {
        $(this).collapse('hide');
    }
});