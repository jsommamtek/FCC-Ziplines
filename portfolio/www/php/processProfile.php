<?php

include('functionLibrary.php');

$errors = array();      // array to hold validation errors
$data   = array();      // array to pass back data

// validate the variables ======================================================
    // if any of these variables don't exist, add an error to our $errors array

    if (empty($_POST['companyName']))
        $errors['companyName'] = 'Company name is required.';

    if (empty($_POST['companyAddr']))
        $errors['companyAddr'] = 'Company address is required.';

    if (empty($_POST['contactName']))
        $errors['contactName'] = 'Contact name is required.';

    // Validate email address
    if (empty($_POST['contactEmail'])) {
        $errors['contactEmail'] = 'Contact email is required.';

	} else if (! filter_var($_POST['contactEmail'], FILTER_VALIDATE_EMAIL)) {
        $errors['contactEmail'] = 'Please enter a valid email address.';
	}

   if (empty($_POST['contactPhone']))
      $errors['contactPhone'] = 'Contact phone is required.';

   if (empty($_POST['coHistory']))
      $errors['coHistory'] = 'Company history is required.';

   if (empty($_POST['webHistory']))
      $errors['webHistory'] = 'Website history is required.';

   if (empty($_POST['buildNow']))
      $errors['buildNow'] = 'Build now is required.';

   if (empty($_POST['constraintOptions']))
      $errors['constraintOptions'] = 'A fixed resource selection is required.';

   if (empty($_POST['startDate'])) {
      $errors['startDate'] = 'Start date is required.';
   } else if (! isValidDate($_POST['startDate'])) {
      $errors['startDate'] = 'Please enter a valid date.';
   }

// return a response ===========================================================

    // if there are any errors in our errors array, return a success boolean of false
    if ( ! empty($errors)) {

      // if there are items in our errors array, return those errors
      $data['success'] = false;
      $data['errors']  = $errors;
      $data['message'] = 'ALERT! Please check your data inputs below for valid data before submitting your profile.';

    } else {

        // Server side form validation passed - return success
        $data['success'] = true;

    }

    // Return all our data to an AJAX call
    echo json_encode($data);

 ?>
