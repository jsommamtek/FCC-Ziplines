<?php
   $myDate = "01/07/2016";
   echo DateTime::createFromFormat('m/d/Y', $myDate)->format("Y-m-d");
?>