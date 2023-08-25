<?php

include("dbConnection.php");

/*
$content = file_get_contents('php://input');
print_r($content); // it's work , result in the photo
*/

date_default_timezone_set("Asia/Manila");
$today = date("YmdHis");


$productname = $_POST["productname"];
$unit = $_POST["unit"];
$price = $_POST["price"];
$expirydate = $_POST["expirydate"];
$availableinventory = $_POST["availableinventory"];
$productImage  = file_get_contents($_FILES["productImage"]["tmp_name"]);

$Directory = "productImages/".$productname."".$today.".png";

file_put_contents($Directory,$productImage);

$query = "INSERT INTO inventory VALUES(0,'$productname','$unit',$price,'$expirydate',$availableinventory,'$Directory')";
$result = mysqli_query($conn,$query);

echo $result;