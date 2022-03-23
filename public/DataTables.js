$("#myTable").DataTable();

let userstatus = document.getElementsByClassName("userstatus");
for(let i=0; i < userstatus.length; i++){
    if(userstatus[i].innerText == 1){
        userstatus[i].classList.add("bg-success");
        userstatus[i].innerText = "Active"
    }
    else if(userstatus[i].innerText == 0){
        userstatus[i].classList.add("bg-danger");
        userstatus[i].innerText = "Inactive"
    }
}