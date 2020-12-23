
let titleLink = document.getElementById("store-title-link");

let urlGetSalesman = "localhost:8080/diskagua/api/v1/usuarios/admin";

let listUser;

titleLink.addEventListener("click", function(){
    //abre o modal com os detalhes das lojas
    $('#store-detail-modal').modal()
})

//retorna todos os vendendores (lojas que devem ser listados pelo usuário)
function init(){

    /*fetch(urlGetSalesman)
    .then(function(response){
        if(response.ok == true && response.status == "200"){
            //colocar redirect aqui dentro.
            listUser = response.json();
        }else{
            alert('E-mail ou senha inválidos.');
        }
    })*/
}