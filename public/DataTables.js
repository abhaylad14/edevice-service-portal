$("#myTable").DataTable();

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

