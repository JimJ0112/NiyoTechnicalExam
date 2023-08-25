<?php

include("dbConnection.php");

$itemNo= $_POST["itemNo"];
$productname = $_POST["productname"];
$unit = $_POST["unit"];
$price = $_POST["price"];
$expirydate = $_POST["expirydate"];
$availableinventory = $_POST["availableinventory"];

if(isset($_FILES["productImage"])){
    $productImage  = file_get_contents($_FILES["productImage"]["tmp_name"]);
    date_default_timezone_set("Asia/Manila");
    $today = date("YmdHis");    

    $Directory = "productImages/".$productname."".$today.".png";

    file_put_contents($Directory,$productImage);

    $query = "UPDATE inventory SET productname = '$productname',unit = '$unit',price = '$price',dateofexpiry = '$expirydate',availableinventory='$availableinventory',imagepath = '$Directory' WHERE itemNo = $itemNo;";
    $result = mysqli_query($conn,$query);
    echo $result;

}else{
    $query = "UPDATE inventory SET productname = '$productname',unit = '$unit',price = '$price',dateofexpiry = '$expirydate',availableinventory='$availableinventory' WHERE itemNo = $itemNo;";
    $result = mysqli_query($conn,$query);
    echo $result;
}
