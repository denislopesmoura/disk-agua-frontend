let btnEditAddress = document.getElementById("btn-addrees-edit"); 
let btnDeleteAddress = document.getElementById("btn-addrees-delete");

btnEditAddress.addEventListener("click", function(){
    $('#address-detail-modal').modal()
})

btnDeleteAddress.addEventListener("click", function(){
    $('#confirmation-delete-modal').modal()
})