<?php

	$dbHost = "localhost";
	$dbUser = "joesomma_pfolio";
	$dbPwd = "";
	$dbName = "joesomma_portfolio"; 
    $dbPort = "8889";         
	
	//$connection = mysqli_connect ($dbHost, $dbUser, $dbPwd, $dbName);
    
    $link = mysqli_init();
    $dbConn = mysqli_real_connect(
        $link, 
        $dbHost, 
        $dbUser, 
        $dbPwd, 
        $dbName,
        $dbPort
    );
	
?>