<?php

    include("dbConnection.php");


    $queryString = "SELECT * FROM inventory";
    $result = mysqli_query($conn,$queryString);
    $resultCheck = mysqli_num_rows($result);
    $data = array();

    if($resultCheck > 0){
       
        while($row = mysqli_fetch_array($result)){

            $row["imagepath"] = "server/".$row["imagepath"];
            $data[] = $row;
        }
        echo json_encode($data);
    }else{
        header('HTTP/1.1 401 Unauthorized', true, 401);
    }