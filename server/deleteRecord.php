<?php

include("dbConnection.php");

$itemNo= $_POST["itemNo"];

    $query = "DELETE FROM inventory WHERE itemNo = $itemNo";
    $result = mysqli_query($conn,$query);
    echo $result;

