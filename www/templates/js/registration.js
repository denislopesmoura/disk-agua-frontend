var cpf = require("../../lib/node_modules/cpf-cnpj-validator");
var email = require("../../lib/node_modules/email-validator");


const createUserURL = 'http://localhost:8080/diskagua/api/v1/usuarios';

//Classe para validação dos campos do formulário de registro
class Validator{

    //tipos de validação
    constructor(){
        this.validations = [
            'mandatoryField',
            'cpfValidation',
            'emailValidation',
            'pwdValidation'
        ]
    }

    //Inicia a validação
    validate(form){

        //retorna todas as validações
        let currValidation = document.querySelectorAll('form .error-validation');
        let currInputValidation = document.querySelectorAll('form .error-input');
        console.log(currValidation.length);
        console.log(currInputValidation.length);
        
        //limpa as validações
        if(currValidation.length > 0){
            console.log(currValidation);
            this.cleanValidations(currValidation, currInputValidation);
        }

        //retorna todos os inputs do fomulário
        let inputs = form.getElementsByTagName("input");

        //tranforma os inputs do formulário em um array interável
        let inputArray = [...inputs];
        
        //passa por cada input e ativa a validação associada a ele
        inputArray.forEach(function(input){
            for(let i = 0; this.validations.length > i; i++){
                if(input.getAttribute(this.validations[i]) != null){
                    //chama o método referente a validação
                    this[this.validations[i]](input);
                }
            }
        }, this)

        let afterValidation = document.querySelectorAll('form .error-validation');

        if(afterValidation.length == 0){
            return true;
        }else{
            return false;
        }

    }

    //verifica se o campo está preenchido.
    mandatoryField(input){

        let message = "Campo obrigatório";

        if(input.value.length == 0){
            input.classList.add("error-input");
            this.printMessage(input,message);
        }

    }

    //verifica se o o numero do cpf é válido
    cpfValidation(input){

        if(input.value == ""){
            this.printMessage(input, "Campo mandatório");
            input.classList.add("error-input");
        }else if(cpf.cpf.isValid(input.value) == false){
            this.printMessage(input,"CPF inválido");
            input.classList.add("error-input");
        }
    }

    //verifica se o email é válido
    emailValidation(input){

        if(input.value == ""){
            this.printMessage(input, "Campo mandatório");
            input.classList.add("error-input");
        }else if(email.validate(input.value) == false){
            this.printMessage(input,"Email inválido");
            input.classList.add("error-input");

        }
    }

    //verifica se a senha é válida
    pwdValidation(input){
        let msg = "As senhas não são iguais"
    }

    //imprime no input a mensagem de erro
    printMessage(input, message){
        
        let template = document.querySelector(".error-validation").cloneNode(true);
        template.textContent = message;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);

        
    }

    //Limpa as validações da tela
    cleanValidations(validations, inputValidations){

        //remove a validação
        validations.forEach(function(element){
            element.remove();
        });

        inputValidations.forEach(elemento => elemento.classList.remove('error-input'));

    }
}

//referência ao formuláro
let form = document.getElementById("register-form");

//Referência aos elementos do formulário
let btnSubmit = document.getElementById("btn-submit");

//objeto para validar o formulário
let validator = new Validator();

//dados para registrar o usuário
let userData = { 
    email: document.getElementById("inputEmail"),
    senha: document.getElementById("inputPassword"),
    imagem: {
        nome: "",
        conteudo: "",
        tipo: ""
    },
    nome: document.getElementById("inputFisrtName") + document.getElementById("inputLastName"),
    telefone: document.getElementById("inputPhone")
};

btnSubmit.addEventListener('click', function(evt){
    evt.preventDefault();

    if(validator.validate(form) == true){

        //envia os dados para o servidor criar o usuário no bd
        fetch(createUserURL,{
            method: 'POST',
            body: JSON.stringify(userData)
        })
        .then(function(response){
            response.json()
        })
        .then(function(response){
            console.log(response);

            //recebe o JSON de resposta e infoma ao usuário o status da criação da conta.
            alert('cadastro realizado com sucesso');
        })
        
        

    };

});