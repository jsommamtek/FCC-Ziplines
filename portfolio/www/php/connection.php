<?php

	$dbHost = "localhost";
	$dbUser = "portfolio";
	$dbPwd = "portfolio";
	$dbName = "Portfolio";
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