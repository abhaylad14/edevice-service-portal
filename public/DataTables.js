$("#myTable").DataTable();

$(".btn-edit").click(function(){
    $('#editModal').modal('toggle');
});
// $(".btn-view").click(function(){
//     $('#viewModal').modal('toggle');
// });
$(".btn-close").click(function(){
    $('#editModal').modal('toggle');
});
userstatus = document.getElementsByClassName("userstatus");
for(let i=0; i < userstatus.length; i++){
    if(userstatus[i].innerText == 1){
        userstatus[i].classList.add("btn-success");
        userstatus[i].innerText = "Active"
    }
    else if(userstatus[i].innerText == 0){
        userstatus[i].classList.add("btn-danger");
        userstatus[i].innerText = "Inactive"
    }
    else if(userstatus[i].innerText == 2){
        userstatus[i].classList.add("btn-warning");
        userstatus[i].innerText = "Verification pending"
    }
}

// request status
rstatus = document.getElementsByClassName("rstatus");
btnaccept = document.getElementsByClassName("btn-accept");
btnreject = document.getElementsByClassName("btn-reject");
for(let i=0; i < rstatus.length; i++){
    if(rstatus[i].innerText == 0){ 
        btnaccept[i].style.visibility = 'visible';
        btnreject[i].style.visibility = 'visible';
        rstatus[i].classList.add("btn-warning");
        rstatus[i].innerText = "Pending"
    }
    else if(rstatus[i].innerText == 1){
        rstatus[i].classList.add("btn-success");
        rstatus[i].innerText = "Accepted"
    }
    else if(rstatus[i].innerText == 2){
        rstatus[i].classList.add("btn-danger");
        rstatus[i].innerText = "Rejected"
    }
    else if(rstatus[i].innerText == 3){
        rstatus[i].classList.add("btn-success");
        rstatus[i].innerText = "Estimation pending"
    }
    else if(rstatus[i].innerText == 4){
        rstatus[i].classList.add("btn-success");
        rstatus[i].innerText = "Service accepted"
    }
    else if(rstatus[i].innerText == 5){
        rstatus[i].classList.add("btn-danger");
        rstatus[i].innerText = "Service rejected"
    }
    else if(rstatus[i].innerText == 6){
        rstatus[i].classList.add("btn-success");
        rstatus[i].innerText = "Waiting for pickup"
    }
    else if(rstatus[i].innerText == 7){
        rstatus[i].classList.add("btn-success");
        rstatus[i].innerText = "Picked up"
    }
    else if(rstatus[i].innerText == 8){
        rstatus[i].classList.add("btn-success");
        rstatus[i].innerText = "Received"
    }
    else if(rstatus[i].innerText == 9){
        rstatus[i].classList.add("btn-success");
        rstatus[i].innerText = "In service"
    }
    else if(rstatus[i].innerText == 10){
        rstatus[i].classList.add("btn-success");
        rstatus[i].innerText = "Shipped"
    }
    else if(rstatus[i].innerText == 11){
        rstatus[i].classList.add("btn-success");
        rstatus[i].innerText = "Out for delivery"
    }
    else if(rstatus[i].innerText == 12){
        rstatus[i].classList.add("btn-success");
        rstatus[i].innerText = "Delivered"
    }
}
