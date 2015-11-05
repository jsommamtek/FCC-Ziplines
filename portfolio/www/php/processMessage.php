<?php
// processMessage.php

$errors = array();      // array to hold validation errors
$data   = array();      // array to pass back data

// validate the variables ======================================================
    // if any of these variables don't exist, add an error to our $errors array

    if (empty($_POST['fullName']))
        $errors['fullName'] = 'Name is required.';

    if (empty($_POST['email']))
        $errors['email'] = 'Email is required.';

    if (empty($_POST['messageBody']))
        $errors['messageBody'] = 'Message body is required.';

// return a response ===========================================================

    // if there are any errors in our errors array, return a success boolean of false
    if ( ! empty($errors)) {

        // if there are items in our errors array, return those errors
        $data['success'] = false;
        $data['errors']  = $errors;
        
    } else {

        // Server side form validation passed - return success
        $data['success'] = true;
                    
    }
    
    // Return all our data to an AJAX call
    echo json_encode($data);
    
 ?>
    