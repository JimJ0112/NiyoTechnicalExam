function showForm(){
    document.getElementById("form-background").style.display = "grid";
    document.getElementById("productname").value = "";
    document.getElementById("unit").value = "";
    document.getElementById("price").value = "";
    document.getElementById("expirydate").value = "";
    document.getElementById("availableinventory").value = "";
    
    document.getElementById("button_save").style.display = "grid";
    document.getElementById("button_update_submit").style.display = "none";
    document.getElementById("form-background").style.display = "grid";
}

function hideForm(){
    document.getElementById("form-background").style.display = "none";
}

function addForm(){
    var productname = validate("product name ",document.getElementById("productname").value);
    var unit  = validate("unit ",document.getElementById("unit").value);
    var price  = validate("price ",document.getElementById("price").value);
    var expirydate  = validate("expiry date ",document.getElementById("expirydate").value);
    var availableinventory  = validate("available inventory ",document.getElementById("availableinventory").value);
    var productImage  = validate("product image ",document.getElementById("productImage").files[0]);

    addRecord(productname,unit,price,expirydate,availableinventory,productImage);
    

}

function showhideButtonsCol(){


    var buttonsCol = document.getElementsByClassName("buttonsCol");
    var buttonsColState = getComputedStyle(buttonsCol[0]).display;

    if(buttonsColState === "none"){
        document.getElementById("buttonsHeader").style.display = "grid";
        for(var i = 0; i<buttonsCol.length;i++){
            buttonsCol[i].style.display ="grid";
            
            localStorage.setItem("buttonsColState","grid");

        }
    }else{
        document.getElementById("buttonsHeader").style.display = "none";
        for(var i = 0; i<buttonsCol.length;i++){
            buttonsCol[i].style.display ="none";
            localStorage.setItem("buttonsColState","none");

        }
    };
    
}

function validate(id,j){
    var id = id;
    var j = j;

    if(j === null|| j=== "" || j=== undefined){
        alert(id + "is empty");
        //return false;
        throw new Error(id + "is empty");
    }else{
        return j;
    }

}

function setUpdateForm(itemNo,listNo){

    var itemNo = itemNo;
    var listNo = listNo;

    var productname =  document.getElementsByClassName("productNameTD")[listNo];
    var unit =  document.getElementsByClassName("unitTD")[listNo];
    var price =  document.getElementsByClassName("priceTD")[listNo];
    var expirydate =  document.getElementsByClassName("dateofexpirationTD")[listNo];
    var availableinventory =  document.getElementsByClassName("availableinventoryTD")[listNo];
    var productImage =  document.getElementsByClassName("productImage")[listNo];

    console.log(productname);

    document.getElementById("productname").value = productname.innerText;
    document.getElementById("unit").value = unit.innerText;
    document.getElementById("price").value = price.innerText;
    document.getElementById("expirydate").value = expirydate.innerText;
    document.getElementById("availableinventory").value = availableinventory.innerText;
    document.getElementById("itemNo").value = itemNo;


    
    document.getElementById("button_save").style.display = "none";
    document.getElementById("button_update_submit").style.display = "grid";
    document.getElementById("form-background").style.display = "grid";

    



}

function addUpdateForm(){
    var productname = validate("product name ",document.getElementById("productname").value);
    var unit  = validate("unit ",document.getElementById("unit").value);
    var price  = validate("price ",document.getElementById("price").value);
    var expirydate  = validate("expiry date ",document.getElementById("expirydate").value);
    var availableinventory  = validate("available inventory ",document.getElementById("availableinventory").value);
    var productImage  = document.getElementById("productImage").files[0];
    var itemNo = document.getElementById("itemNo").value;

    updateRecords(itemNo,productname,unit,price,expirydate,availableinventory,productImage);
    

}

function setTable(dataArray){
    var dataArray = dataArray;
    var tableTbody = document.getElementById("tableTbody");
    tableTbody.innerHTML = "";
    var buttonsColState = localStorage.getItem("buttonsColState");
    document.getElementById("tableThead").style.display = "auto";


    for(var i = 0; i< dataArray.length; i++){
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");
        var td7 = document.createElement("td");
        var td8 = document.createElement("td");
 


        td1.setAttribute("class","productNameTD");
        td2.setAttribute("class","unitTD");
        td3.setAttribute("class","priceTD");
        td4.setAttribute("class","dateofexpirationTD");
        td5.setAttribute("class","availableinventoryTD");
       
      

        var image = new Image();
        image.src = dataArray[i]["imagepath"];
        image.setAttribute("class","productImage");
        td7.appendChild(image);


        var updateButton = document.createElement("button");
        updateButton.setAttribute("class","btn btn-primary");
        updateButton.setAttribute("onclick","setUpdateForm('" + dataArray[i]["itemNo"] + "',"+i+")");
        updateButton.innerText = "Update";

        var deleteButton = document.createElement("button");
        deleteButton.setAttribute("class","btn btn-danger");
        deleteButton.setAttribute("onclick","deleteRecord('" + dataArray[i]["itemNo"] + "')");
        deleteButton.innerText = "Delete";

        td8.setAttribute("class","buttonsCol");
        td8.appendChild(updateButton);
        td8.appendChild(deleteButton);

        

        if(buttonsColState != "" || buttonsColState != null){
            td8.style.display = buttonsColState;
            document.getElementById("buttonsHeader").style.display =  buttonsColState;

        } else{

        }




        td1.innerText = dataArray[i]["productname"];
        td2.innerText = dataArray[i]["unit"];
        td3.innerText = "Php " + dataArray[i]["price"] + ".00";
        td4.innerText = dataArray[i]["dateofexpiry"];
        td5.innerText = dataArray[i]["availableinventory"];
        td6.innerText ="Php " +  parseFloat(dataArray[i]["availableinventory"]) * parseFloat(dataArray[i]["price"]) + ".00";
       


        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
    


        tableTbody.appendChild(tr);
    }

}


/* AJAX functions */
function addRecord(productname,unit,price,expirydate,availableinventory,productImage){
    var productname = productname;
    var unit = unit;
    var price = price;
    var expirydate = expirydate;
    var availableinventory = availableinventory;
    var productImage = productImage;

    var formdata = new FormData();
    formdata.append('productname',productname);
    formdata.append('unit',unit);
    formdata.append('price',price);
    formdata.append('expirydate',expirydate);
    formdata.append('availableinventory',availableinventory);
    formdata.append('productImage',productImage);

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function() {
        if (this.readyState === 4 || this.status === 200){ 
           

            var dataArray = this.response;

                
               
            console.log(dataArray);
            if(dataArray === "1"){
                alert("Record saved!");
                hideForm();
            }else{
                alert("Record not saved");
            }
          
 
           

        }else{
            console.log(err);
        }      
    };

    xmlhttp.open("POST", "server/addRecord.php", true);
    xmlhttp.send(formdata);
}


function fetchRecords(){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function() {
        if (this.readyState === 4 || this.status === 200){ 
            var dataArray = this.response;
            if(this.status === 401){
                document.getElementById("tableThead").style.display = "none";
                tableTbody.innerText = "No records yet";
            } else{
                dataArray = JSON.parse(dataArray);
                setTable(dataArray);
            }
            
        }else{
            console.log(err);
        }      
    };

    xmlhttp.open("POST", "server/getRecords.php", true);
    xmlhttp.send();
}



function updateRecords(itemNo,productname,unit,price,expirydate,availableinventory,productImage){
    var productname = productname;
    var unit = unit;
    var price = price;
    var expirydate = expirydate;
    var availableinventory = availableinventory;
    var productImage = productImage;
    var itemNo = itemNo;

    var formdata = new FormData();
    formdata.append('itemNo',itemNo);
    formdata.append('productname',productname);
    formdata.append('unit',unit);
    formdata.append('price',price);
    formdata.append('expirydate',expirydate);
    formdata.append('availableinventory',availableinventory);
    formdata.append('productImage',productImage);

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function() {
        if (this.readyState === 4 || this.status === 200){ 
           

            var dataArray = this.response;

                
               
            console.log(dataArray);
            if(dataArray === "1"){
                alert("Record updated!");
                hideForm();
            }else{
                alert("Record not Not updated");
            }
          
 
           

        }else{
            console.log(err);
        }      
    };

    xmlhttp.open("POST", "server/updateRecord.php", true);
    xmlhttp.send(formdata);
}

function deleteRecord(itemNo){
    var itemNo = itemNo;
    var query = "itemNo=" + itemNo;
    console.log(query);

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function() {
        if (this.readyState === 4 || this.status === 200){ 
           

            var dataArray = this.response;

                
               
            console.log(dataArray);
            if(dataArray === "1"){
                alert("Record deleted!");
                hideForm();
            }else{
                alert("Something went wrong, Please try again later");
            }
          
 
           

        }else{
            console.log(err);
        }      
    };

    xmlhttp.open("POST", "server/deleteRecord.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(query);
}

/* Sequence */
setInterval(fetchRecords,1000);

