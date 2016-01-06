
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

    // Place the copyright footer near the bottom of the window
    $(".mt-copyright").css("padding-top", $(window).height() - 260);

    // PROCESS SEND MESSAGE FORM

    //$('#sendMessage').click(function(event) {

    $('form').submit(function(event) {

        //alert("form was submitted");

        // Clear any errors from previous submit
        $('.form-group').removeClass('has-error'); // remove the error class
        $('.help-block').remove(); // remove the error text
        $('#successMessage').remove(); // remove the successMessage div

        // Get the form data into a JSON object getting ready for ajax post to server
        var formData = {
            'fullName'       : $('#fullName').val(),
            'email'          : $('#email').val(),
            'messageBody'    : $('#messageBody').val()
        };

        // Process form data validation using PHP
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'php/processMessage.php', // the url where we want to POST
            data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
            encode      : true
        })
            // Using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                //console.log(data);
                //console.log(data.success);
                //console.log(data.errors);

                // Here we will handle errors and validation messages
                if (! data.success) {

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

                // Validation passed so make another ajax call to update the database
                } else {

                    //alert ("Validation passed - about to update the database");

                    $.post('php/updateMessage.php', formData, function(data) {

                        // place success code here
                        if (! data.success) {

                            if (data.errors.connection) {
                                $('#formSendMessage').append('<div id="successMessage" class="alert alert-danger">' + data.errors.connection + '</div>');
                            }

                            if (data.errors.fields) {
                                $('#formSendMessage').append('<div id="successMessage" class="alert alert-danger">' + data.errors.fields + '</div>');
                            }

                        } else {

                            // ALL GOOD! show the success message!
                            $('#formSendMessage').append('<div id="successMessage" class="alert alert-success">' + data.message + '</div>');

                            // Cleanup the form values after success
                            $('#fullName').val('');
                            $('#email').val('');
                            $('#messageBody').val('');

                            // usually after form submission, you'll want to redirect
                            // window.location = '/thank-you'; // redirect a user to another page
                            //alert('success'); // for now we'll just alert the user

                        } // End (! data.success) database check

                    }, 'json') // End $.post php/updateMessage.php

                        // Handle ajax fail promise from update database
                        .fail(function(data) {

                            // AJAX PROMISE FAIL ERROR! show a fail message!
                            $('#formSendMessage').append('<div id="successMessage" class="alert alert-danger">AJAX fail promise callback was fired</div>');

                        }); // End .fail()

                } // End (! data.success) validation check

            }) // End .done() validation check

            // Handle ajax fail promise from validate form data
            .fail(function(data) {

                // show any errors
                // best to remove for production
                //console.log(data);

                // AJAX PROMISE FAIL ERROR! show a fail message!
                $('#formSendMessage').append('<div id="successMessage" class="alert alert-danger">AJAX fail promise callback was fired</div>');

            }); // End .fail()

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();

    }); // end process send message form

}); //end $(document).ready()
