<?php
// updateMessage.php

$dbErrors = array();      // array to hold database errors
$dbData   = array();      // array to pass back data

	include('connection.php');

	// Check for a db connection
	If (! $dbConn) {

		$dbErrors['connection'] = 'Error connecting to database.';
		//$dbErrors['connection'] = mysqli_connect_error();

        $dbData['success'] = false;
        $dbData['errors']  = $dbErrors;

	} else {

        // Make sure we have posted data
        if (empty($_POST['companyName']))
            $dbErrors['companyName'] .= 'Company name is required.';

         if (empty($_POST['companyAddr']))
            $dbErrors['companyAddr'] = 'Company address is required.';

         if (empty($_POST['contactName']))
            $dbErrors['contactName'] = 'Contact name is required.';

         // Validate email address
         if (empty($_POST['contactEmail'])) {
            $dbErrors['contactEmail'] = 'Contact email is required.';

         } else if (! filter_var($_POST['contactEmail'], FILTER_VALIDATE_EMAIL)) {
            $dbErrors['contactEmail'] = 'Please enter a valid email address.';
         }

         if (empty($_POST['contactPhone']))
            $dbErrors['contactPhone'] = 'Contact phone is required.';

         if (empty($_POST['coHistory']))
            $dbErrors['coHistory'] = 'Company history is required.';

         if (empty($_POST['webHistory']))
            $dbErrors['webHistory'] = 'Website history is required.';

         if (empty($_POST['buildNow']))
            $dbErrors['buildNow'] = 'Build now is required.';

         if (empty($_POST['constraintOptions']))
            $dbErrors['constraintOptions'] = 'A fixed resource selection is required.';

         if (empty($_POST['startDate']))
            $dbErrors['startDate'] = 'Start date is required.';

        if (empty($dbErrors)) {

            $query = 'INSERT INTO Clients (
                        companyName,
                        companyAddr,
                        contactName,
                        contactEmail,
                        contactPhone,
                        companyHistory,
                        websiteHistory,
                        buildNow,
                        projectConstraint,
                        startDate
                        )
                        VALUES (
                           "'.mysqli_real_escape_string($link, $_POST["companyName"]).'",
                           "'.mysqli_real_escape_string($link, $_POST["companyAddr"]).'",
                           "'.mysqli_real_escape_string($link, $_POST["contactName"]).'",                          "'.mysqli_real_escape_string($link, $_POST["contactEmail"]).'",
                           "'.mysqli_real_escape_string($link, $_POST["contactPhone"]).'",
                           "'.mysqli_real_escape_string($link, $_POST["coHistory"]).'",
                           "'.mysqli_real_escape_string($link, $_POST["webHistory"]).'",
                           "'.mysqli_real_escape_string($link, $_POST["buildNow"]).'",
                           "'.mysqli_real_escape_string($link, $_POST["constraintOptions"]).'",
                           "'.DateTime::createFromFormat('m/d/Y', mysqli_real_escape_string($link, $_POST["startDate"]))->format("Y-m-d").'"
                           )';

            //$dbData['query'] = $query;

            // Run the insert and check if query was valid and returned a result
            $result = mysqli_query($link, $query);

            if ($result > 0) {

                // Show a message of success and provide a true success variable
                $dbData['success'] = true;
                $dbData['message'] = 'SUCCESS! Your profile entry was created successfully.';


            } else {

                $dbErrors['connection'] = mysqli_error($link);
                //$dbErrors['connection'] = 'Problem! There was an error saving your message.';

                $dbData['success'] = false;
                $dbData['errors']  = $dbErrors;

            } // End mysqli_query

        } else {

            // if there are items in our errors array, return those errors
            $dbErrors['connection'] = false;
            $dbData['success'] = false;
            $dbData['errors']  = $dbErrors;

        } // End empty($errors)

	} // End (! dbConn)

    // Clean up db connection
    mysqli_close($link);

    // Return all our data to an AJAX call
    echo json_encode($dbData);
?>

