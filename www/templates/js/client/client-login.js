let loginBtn = document.getElementById("login-button");

let loginURL = 'http://localhost:8080/diskagua/api/v1/login';

let loginData = {
    email : document.getElementById("inputEmail"),
    senha : document.getElementById("inputPassword")
};

loginBtn.addEventListener("click", function(e){
    
    e.preventDefault();

    //verifica se o usuário existe no servidor.
    /*fetch(loginURL,{
        method: 'POST',
        body: JSON.stringify(loginData)
    })
    .then(function(response){
        if(response.ok == true && response.status == "200"){
            //colocar redirect aqui dentro.
        }else{
            alert('E-mail ou senha inválidos.');
        }
    })*/

    //Redireciona para a tela de inicio do cliente.

    window.location.href = "http://127.0.0.1:5500/www/templates/html/client/client-homepage.html";



})