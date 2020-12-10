(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * cpf-cnpj-validator v1.0.3
 * (c) 2020-present Carvalho, Vinicius Luiz <carvalho.viniciusluiz@gmail.com>
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const BLACKLIST = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '12345678909'
];
const STRICT_STRIP_REGEX = /[.-]/g;
const LOOSE_STRIP_REGEX = /[^\d]/g;
const verifierDigit = (digits) => {
    const numbers = digits
        .split('')
        .map(number => {
        return parseInt(number, 10);
    });
    const modulus = numbers.length + 1;
    const multiplied = numbers.map((number, index) => number * (modulus - index));
    const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;
    return (mod < 2 ? 0 : 11 - mod);
};
const strip = (number, strict) => {
    const regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
    return (number || '').replace(regex, '');
};
const format = (number) => {
    return strip(number).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
};
const isValid = (number, strict) => {
    const stripped = strip(number, strict);
    if (!stripped) {
        return false;
    }
    if (stripped.length !== 11) {
        return false;
    }
    if (BLACKLIST.includes(stripped)) {
        return false;
    }
    let numbers = stripped.substr(0, 9);
    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);
    return numbers.substr(-2) === stripped.substr(-2);
};
const generate = (formatted) => {
    let numbers = '';
    for (let i = 0; i < 9; i += 1) {
        numbers += Math.floor(Math.random() * 9);
    }
    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);
    return (formatted ? format(numbers) : numbers);
};
var cpf = {
    verifierDigit,
    strip,
    format,
    isValid,
    generate,
};

const BLACKLIST$1 = [
    '00000000000000',
    '11111111111111',
    '22222222222222',
    '33333333333333',
    '44444444444444',
    '55555555555555',
    '66666666666666',
    '77777777777777',
    '88888888888888',
    '99999999999999'
];
const STRICT_STRIP_REGEX$1 = /[-\\/.]/g;
const LOOSE_STRIP_REGEX$1 = /[^\d]/g;
const verifierDigit$1 = (digits) => {
    let index = 2;
    const reverse = digits.split('').reduce((buffer, number) => {
        return [parseInt(number, 10)].concat(buffer);
    }, []);
    const sum = reverse.reduce((buffer, number) => {
        buffer += number * index;
        index = (index === 9 ? 2 : index + 1);
        return buffer;
    }, 0);
    const mod = sum % 11;
    return (mod < 2 ? 0 : 11 - mod);
};
const strip$1 = (number, strict) => {
    const regex = strict ? STRICT_STRIP_REGEX$1 : LOOSE_STRIP_REGEX$1;
    return (number || '').replace(regex, '');
};
const format$1 = (number) => {
    return strip$1(number).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
};
const isValid$1 = (number, strict) => {
    const stripped = strip$1(number, strict);
    if (!stripped) {
        return false;
    }
    if (stripped.length !== 14) {
        return false;
    }
    if (BLACKLIST$1.includes(stripped)) {
        return false;
    }
    let numbers = stripped.substr(0, 12);
    numbers += verifierDigit$1(numbers);
    numbers += verifierDigit$1(numbers);
    return numbers.substr(-2) === stripped.substr(-2);
};
const generate$1 = (formatted) => {
    let numbers = '';
    for (let i = 0; i < 12; i += 1) {
        numbers += Math.floor(Math.random() * 9);
    }
    numbers += verifierDigit$1(numbers);
    numbers += verifierDigit$1(numbers);
    return (formatted ? format$1(numbers) : numbers);
};
var cnpj = {
    verifierDigit: verifierDigit$1,
    strip: strip$1,
    format: format$1,
    isValid: isValid$1,
    generate: generate$1
};

const validator = joi => ({
    type: 'document',
    base: joi.string(),
    messages: {
        'document.cpf': 'CPF inválido',
        'document.cnpj': 'CNPJ inválido'
    },
    rules: {
        cpf: {
            validate(value, helpers, args, options) {
                if (!cpf.isValid(value)) {
                    return helpers.error('document.cpf');
                }
                return value;
            }
        },
        cnpj: {
            validate(value, helpers, args, options) {
                if (!cnpj.isValid(value)) {
                    return helpers.error('document.cnpj');
                }
                return value;
            }
        }
    }
});

exports.cpf = cpf;
exports.cnpj = cnpj;
exports.validator = validator;
exports.default = validator;

},{}],2:[function(require,module,exports){
"use strict";

var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
// Thanks to:
// http://fightingforalostcause.net/misc/2006/compare-email-regex.php
// http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
// http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378
exports.validate = function(email)
{
	if (!email)
		return false;
		
	if(email.length>254)
		return false;

	var valid = tester.test(email);
	if(!valid)
		return false;

	// Further checking of some things regex can't handle
	var parts = email.split("@");
	if(parts[0].length>64)
		return false;

	var domainParts = parts[1].split(".");
	if(domainParts.some(function(part) { return part.length>63; }))
		return false;

	return true;
}
},{}],3:[function(require,module,exports){
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
},{"../../lib/node_modules/cpf-cnpj-validator":1,"../../lib/node_modules/email-validator":2}]},{},[3]);
