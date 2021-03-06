$("#myTable").DataTable();

$('#report').DataTable( {
    dom: 'Bfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
    ]
} );

// $('#bill').DataTable( {
//     "bPaginate": false,
//     buttons: [
//         'copy', 'csv', 'excel', 'pdf', 'print'
//     ]
// } );


try{
    document.getElementById("downloadpdf")
    .addEventListener("click", () => {
        const invoice = document.getElementById("invoice");
        console.log(invoice);
        var opt = {
            margin: 1,
            filename: 'E-Serve_Bill.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(invoice).set(opt).save();
    })
}
catch(error){

}
        

dtbuttons = document.getElementsByClassName("dt-button")
for(let i=0; i < dtbuttons.length; i++){
    dtbuttons[i].classList.add("btn");
    dtbuttons[i].classList.add("btn-primary");
}

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
abtnaccept = document.getElementsByClassName("abtn-accept");
abtnreject = document.getElementsByClassName("abtn-reject");
cbtnaccept = document.getElementsByClassName("cbtn-accept");
cbtnreject = document.getElementsByClassName("cbtn-reject");
crbtndelete = document.getElementsByClassName("crbtn-delete");
btnservice = document.getElementsByClassName("btn-service");
btncomplete = document.getElementsByClassName("btn-complete");
viewbill = document.getElementsByClassName("viewbill");
for(let i=0; i < rstatus.length; i++){
    if(rstatus[i].innerText == 0){ 
        rstatus[i].classList.add("btn-warning");
        rstatus[i].innerText = "Pending";
        try {
            abtnaccept[i].style.visibility = 'visible';
            abtnreject[i].style.visibility = 'visible';
            crbtndelete[i].style.visibility = 'visible';    
        } catch (error) {
            
        }
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
        rstatus[i].innerText = "Waiting for pickup"
    }
    else if(rstatus[i].innerText == 4){
        rstatus[i].classList.add("btn-success");
        rstatus[i].innerText = "Picked up"
    }
    else if(rstatus[i].innerText == 5){
        rstatus[i].classList.add("btn-success");
        rstatus[i].innerText = "Delivered to the company"
    }
    else if(rstatus[i].innerText == 6){
        rstatus[i].classList.add("btn-warning");
        rstatus[i].innerText = "price approval pending"
        try {
            cbtnaccept[i].style.visibility = 'visible';
            cbtnreject[i].style.visibility = 'visible';
        } catch (error) {
            
        }
    }
    else if(rstatus[i].innerText == 7){
        rstatus[i].classList.add("btn-success");
        rstatus[i].innerText = "Service accepted"
        try {
            btnservice[i].style.visibility = 'visible';
        } catch (error) {
            
        }
    }
    else if(rstatus[i].innerText == 8){
        rstatus[i].classList.add("btn-danger");
        rstatus[i].innerText = "Service Rejected"
    }
    else if(rstatus[i].innerText == 9){
        rstatus[i].classList.add("btn-success");
        rstatus[i].innerText = "In service"
        try {
            btncomplete[i].style.visibility = 'visible';
        } catch (error) {
            
        }
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
        try {
            viewbill[i].style.visibility = 'visible';
        } catch (error) {
                
        }
    }
}

// estimate button
btnestimate = document.getElementsByClassName("btn-estimate");
for(let i=0; i<btnestimate.length; i++){
    if(btnestimate[i].id === "5"){
        btnestimate[i].style.visibility = 'visible';
    }
}