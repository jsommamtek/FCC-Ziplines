<?php

function isValidDate($date) {
   $testArr  = explode('/', $date);
   if (count($testArr) != 3) {
      return FALSE;  // Problem with formatting ...
   }

   if (strlen($testArr[0]) > 2 || strlen($testArr[1]) > 2) {
      return FALSE;  // To many chars in month or day
   }

   // CHECK MONTH, DAY. YEAR in order
   if (! checkdate($testArr[0], $testArr[1], $testArr[2])) {
      return FALSE;  // Not a valid date ...
   }

   return TRUE;   // We are good if we made it here
}

?>