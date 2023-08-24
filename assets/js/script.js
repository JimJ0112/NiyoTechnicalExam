function showForm(){
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
          
 
           

        }else{
            console.log(err);
        }      
    };

    xmlhttp.open("POST", "server/addRecord.php", true);
    xmlhttp.send(formdata);
}