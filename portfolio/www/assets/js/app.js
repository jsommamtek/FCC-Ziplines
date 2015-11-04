
/* APPLICATION JAVASCRIPT */
$(document).ready(function() {

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
    
    $(".mt-copyright-row").css("height", $(window).height() - 620);

    // PROCESS THE SEND MESSAGE FORM
    $('#send-message').click(function(event) {

        // clear any errors from previous submit
        $('.form-group').removeClass('has-error'); // remove the error class
        $('.help-block').remove(); // remove the error text
        $('#successMessage').remove(); // remove the success div
        

        // get the form data
        var formData = {
            'fullName'       : $('#fullName').val(),
            'email'          : $('#email').val(),
            'messageBody'    : $('#messageBody').val()
        };
        
        //console.log(formData);

        // process the form using PHP
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'php/signUp.php', // the url where we want to POST
            data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
            encode      : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                //console.log(data); 
                //console.log(data.success);
                //console.log(data.errors);

                // here we will handle errors and validation messages
                if ( ! data.success) {
            
                    // handle errors for name ---------------
                    if (data.errors.fullName) {
                        $('#fullNameGroup').addClass('has-error'); // add the error class to show red input
                        $('#fullNameGroup').append('<div class="help-block">' + data.errors.fullName + '</div>'); // add the actual error message under our input
                    }
        
                    // handle errors for email ---------------
                    if (data.errors.email) {
                        $('#emailGroup').addClass('has-error'); // add the error class to show red input
                        $('#emailGroup').append('<div class="help-block">' + data.errors.email + '</div>'); // add the actual error message under our input
                    }
        
                    // handle errors for message body ---------------
                    if (data.errors.messageBody) {
                        $('#messageBodyGroup').addClass('has-error'); // add the error class to show red input
                        $('#messageBodyGroup').append('<div class="help-block">' + data.errors.messageBody + '</div>'); // add the actual error message under our input
                    }
        
                } else {
        
                    // ALL GOOD! just show the success message!
                    $('#formSignUp').append('<div id="successMessage" class="alert alert-success">' + data.message + '</div>');
        
                    // cleanup the form values after success
                    $('#fullName').val('');
                    $('#email').val('');
                    $('#messageBody').val('');
                    
                    // usually after form submission, you'll want to redirect
                    // window.location = '/thank-you'; // redirect a user to another page
                    //alert('success'); // for now we'll just alert the user
        
                }                
                
            });

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});
