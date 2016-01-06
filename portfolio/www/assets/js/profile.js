
/* APPLICATION JAVASCRIPT */
$(document).ready(function () {

   // Set min height of each container to the window height to fill the screen
   $(".mt-content-container").css("min-height", $(window).height());

   // Show the bootstrap datapicker when clicked
   $('#startDateGroup .input-group.date').datepicker({
   });

   // PROCESS CLIENT PROFILE FORM

   //$('#sendMessage').click(function(event) {

   $('form').submit(function (event) {

      //alert("Client profile form was submitted");

      // Clear any errors from previous submit
      $('.form-group').removeClass('has-error'); // remove the error class
      $('.help-block').remove(); // remove the error text
      $('#successMessage').remove(); // remove the successMessage div

      // Get the form data into a JSON object getting ready for ajax post to server
      var formData = {
         'companyName'        : $('#companyName').val(),
         'companyAddr'        : $('#companyAddr').val(),
         'contactName'        : $('#contactName').val(),
         'contactEmail'       : $('#contactEmail').val(),
         'contactPhone'       : $('#contactPhone').val(),
         'coHistory'          : $('#coHistory').val(),
         'webHistory'         : $('#webHistory').val(),
         'buildNow'           : $('#buildNow').val(),
         'constraintOptions'  : $('#constraintOptions:checked').val(),
         'startDate'          : $('#startDate').val(),
      };

      //console.log(formData);

      // Process form data validation using PHP
      $.ajax({
         type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
         url: 'php/processProfile.php', // the url where we want to POST
         data: formData, // our data object
         dataType: 'json', // what type of data do we expect back from the server
         encode: true
      })
      // Using the done promise callback
         .done(function (data) {

            // log data to the console so we can see
            //console.log(data);
            //console.log(data.success);
            //console.log(data.errors);

            // Here we will handle errors and validation messages
            if (! data.success) {

               // handle errors for company name ---------------
               if (data.errors.companyName) {
                  $('#companyNameGroup').addClass('has-error'); // add the error class to show red input
                  $('#companyNameGroup').append('<div class="help-block">' + data.errors.companyName + '</div>'); // add the actual error message under our input
               }

               // handle errors for company address ---------------
               if (data.errors.companyAddr) {
                  $('#companyAddrGroup').addClass('has-error'); // add the error class to show red input
                  $('#companyAddrGroup').append('<div class="help-block">' + data.errors.companyAddr + '</div>'); // add the actual error message under our input
               }

               // handle errors for contact full name ---------------
               if (data.errors.contactName) {
                  $('#contactNameGroup').addClass('has-error'); // add the error class to show red input
                  $('#contactNameGroup').append('<div class="help-block">' + data.errors.contactName + '</div>'); // add the actual error message under our input
               }

               // handle errors for contact email ---------------
               if (data.errors.contactEmail) {
                  $('#contactEmailGroup').addClass('has-error'); // add the error class to show red input
                  $('#contactEmailGroup').append('<div class="help-block">' + data.errors.contactEmail + '</div>'); // add the actual error message under our input
               }

               // handle errors for contact phone ---------------
               if (data.errors.contactPhone) {
                  $('#contactPhoneGroup').addClass('has-error'); // add the error class to show red input
                  $('#contactPhoneGroup').append('<div class="help-block">' + data.errors.contactPhone + '</div>'); // add the actual error message under our input
               }

               // handle errors for company history ---------------
               if (data.errors.coHistory) {
                  $('#coHistoryGroup').addClass('has-error'); // add the error class to show red input
                  $('#coHistoryGroup').append('<div class="help-block">' + data.errors.coHistory + '</div>'); // add the actual error message under our input
               }

                // handle errors for website history ---------------
               if (data.errors.webHistory) {
                  $('#webHistoryGroup').addClass('has-error'); // add the error class to show red input
                  $('#webHistoryGroup').append('<div class="help-block">' + data.errors.webHistory + '</div>'); // add the actual error message under our input
               }

               // handle errors for build now comments ---------------
               if (data.errors.buildNow) {
                  $('#buildNowGroup').addClass('has-error'); // add the error class to show red input
                  $('#buildNowGroup').append('<div class="help-block">' + data.errors.buildNow + '</div>'); // add the actual error message under our input
               }

               // handle errors for contraint options comments ---------------
               if (data.errors.constraintOptions) {
                  $('#constraintOptionsGroup').addClass('has-error'); // add the error class to show red input
                  $('#constraintOptionsGroup').append('<div class="help-block">' + data.errors.constraintOptions + '</div>'); // add the actual error message under our input
               }

               // handle errors for build now comments ---------------
               if (data.errors.startDate) {
                  $('#startDateGroup').addClass('has-error'); // add the error class to show red input
                  $('#startDateGroup').append('<div class="help-block">' + data.errors.startDate + '</div>'); // add the actual error message under our input
               }

               // Set validation failed alert
               if (data.message) {
                  $('#formClientProfile').prepend('<div id="successMessage" class="alert alert-danger">' + data.message + '</div>');
               }

            // Validation passed so make another ajax call to update the database
            } else {

               //alert("Validation passed - about to update the database");

               $.post('php/updateProfile.php', formData, function (data) {

                  // place success code here
                  if (! data.success) {

                     if (data.errors.connection) {
                        $('#formClientProfile').prepend('<div id="successMessage" class="alert alert-danger">' + data.errors.connection + '</div>');
                     }

                     if (data.errors.fields) {
                        $('#formClientProfile').prepend('<div id="successMessage" class="alert alert-danger">' + data.errors.fields + '</div>');
                     }

                  } else {

                     // ALL GOOD! show the success message!
                     $('#formClientProfile').prepend('<div id="successMessage" class="alert alert-success">' + data.message + '</div>');

                     // Cleanup the form values after success
                     $('#companyName').val('');
                     $('#companyAddr').val('');
                     $('#contactName').val('');
                     $('#contactEmail').val('');
                     $('#contactPhone').val('');
                     $('#coHistory').val('');
                     $('#webHistory').val('');
                     $('#buildNow').val('');
                     //$('#constraintOptions').val('');
                     $('#startDate').val('');

                     // usually after form submission, you'll want to redirect
                     // window.location = '/thank-you'; // redirect a user to another page
                     //alert('success'); // for now we'll just alert the user

                  } // End (! data.success) database check

               }, 'json') // End $.post php/updateMessage.php

               // Handle ajax fail promise from update database
                  .fail(function (data) {

                     // AJAX PROMISE FAIL ERROR! show a fail message!
                     $('#formClientProfile').prepend('<div id="successMessage" class="alert alert-danger">AJAX fail promise callback was fired</div>');

                  }); // End .fail()

            } // End (! data.success) validation check

         }) // End .done() validation check

      // Handle ajax fail promise from validate form data
         .fail(function (data) {

            // show any errors
            // best to remove for production
            console.log(data);

            // AJAX PROMISE FAIL ERROR! show a fail message!
            $('#formClientProfile').append('<div id="successMessage" class="alert alert-danger">AJAX fail promise callback was fired</div>');

         }); // End .fail()

         // Move to the top of the form
         $("html, body").animate({ scrollTop: 0 }, "slow");

      // stop the form from submitting the normal way and refreshing the page
      event.preventDefault();

   }); // end process send message form

}); //end $(document).ready()
