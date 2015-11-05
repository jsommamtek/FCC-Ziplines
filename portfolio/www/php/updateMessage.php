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
        if (empty($_POST['fullName']))
            $dbErrors['fullName'] .= 'Name is required.';
    
        if (empty($_POST['email']))
            $dbErrors['email'] .= 'Email is required.';
    
        if (empty($_POST['messageBody']))
            $dbErrors['messageBody'] .= 'Message body is required.';
	
        if (empty($dbErrors)) {   
                 
            $query = 'INSERT INTO Contacts (FullName, Email, Message) 
                VALUES ("'.mysqli_real_escape_string($link, $_POST["fullName"]).'",
                        "'.mysqli_real_escape_string($link, $_POST["email"]).'",
                        "'.mysqli_real_escape_string($link, $_POST["messageBody"]).'")';
                                    
            //$dbData['query'] = $query;
            
            // Run the insert and check if query was valid and returned a result     
            $result = mysqli_query($link, $query);
            
            if ($result > 0) {
    
                // Show a message of success and provide a true success variable
                $dbData['success'] = true;
                $dbData['message'] = 'Success! Message sent.';
            
                
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

    