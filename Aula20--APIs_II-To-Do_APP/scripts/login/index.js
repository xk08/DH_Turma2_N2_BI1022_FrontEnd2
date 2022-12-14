/* Captura os elementos do formulário de login */
let emailLogin = document.querySelector("#inputEmail");
let passwordLogin = document.querySelector("#inputPassword");
let botaoAcessarLogin = document.querySelector("#botaoAcessarLogin");

/* Altera as caracteristicas do botão acessar */
botaoAcessarLogin.style.backgroundColor = "#979292A1"
botaoAcessarLogin.innerText = "Bloqueado";

/* Variáveis de controle para as validações do form de login */
let emailIsValid = false;
let passwordIsValid = false;
let minPasswordCaracteres = 4;

/* Adiciona um evento de click ao botão de acessar */
botaoAcessarLogin.addEventListener("click", function (evento) {

    //Busca os valores atualizados dos inputs
    emailLogin = document.querySelector("#inputEmail");
    passwordLogin = document.querySelector("#inputPassword");


    if (validaLogin()) {

        evento.preventDefault();

        /* Normalizando os inputs da tela de login */
        emailLogin = normalizaStringUsandoTrim(emailLogin.value);
        passwordLogin = normalizaStringUsandoTrim(passwordLogin.value);

        let usuarioJs = {
            email: emailLogin,
            password: passwordLogin
        }

        let usuarioJson = JSON.stringify(usuarioJs);

        loginAPI(usuarioJson);


    } else {
        console.log("Login inválido");
    }

});


function loginAPI(objetoJson) {
    let requestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: objetoJson
    }

    fetch(`${baseUrl()}/users/login`, requestInit)
        .then(
            resposta => {
                return resposta.json();
            }
        )
        .then(
            resposta => {
                loginSucesso(resposta);
            }
        )
        .catch(
            erro => {
                loginErro(erro);
            }
        )
}

function loginSucesso(resposta) {

}

function loginErro(resposta) {

}

/* Verifica se ambas as informações do formulário de login foram validadas */
function validaLogin() {
    if (emailIsValid && passwordIsValid) {
        /* Ativa o botão de acesso novamente e retorna suas propriedades */
        botaoAcessarLogin.style.backgroundColor = "#7898FF"
        botaoAcessarLogin.innerText = "Acessar";
        botaoAcessarLogin.removeAttribute("disabled");
        return true;
    } else {
        /* Desabilita o botão de acesso e troca suas caracteristicas*/
        botaoAcessarLogin.style.backgroundColor = "#979292A1"
        botaoAcessarLogin.innerText = "Bloqueado";
        botaoAcessarLogin.setAttribute("disabled", true);
        return false;
    }
}

/* Validações no Input de EMAIL */
emailLogin.addEventListener("keyup", () => { //Possível também com o (blur)
    //Busca os valores atualizados dos inputs
    emailLogin = document.querySelector("#inputEmail");
    let emailValidacao = document.getElementById("emailValidacao");

    /* Alterando o texto do Small - Validando se o email tem um formato válido */
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailLogin.value)) {
        emailValidacao.innerText = "E-mail inválido";
        //Troca a cor da borda do input
        emailLogin.style.border = "2px solid #E9554EBB"
        emailIsValid = false;

    } else {
        emailValidacao.innerText = "";
        //Troca a cor da borda do input
        emailLogin.style.border = "2px solid transparent"
        emailIsValid = true;
    }
    /* Em caso de sucesso ou erro na validação, chama a função que valida o login*/
    validaLogin();
});

/* Validações no Input da SENHA */
passwordLogin.addEventListener("keyup", () => {
    //Busca os valores atualizados dos inputs
    passwordLogin = document.querySelector("#inputPassword");
    let passwordValidacao = document.getElementById("passwordValidacao");
    /* Alterandoo texto do Small - Verifica se o campo é nulo/vazio */
    if (passwordLogin.value.length <= minPasswordCaracteres) {
        passwordValidacao.innerText = `Faltam ${(minPasswordCaracteres + 1) - passwordLogin.value.length} caracteres`;
        //Troca a cor da borda do input
        passwordLogin.style.border = "2px solid #E9554EBB"
        passwordIsValid = false;

    } else {
        passwordValidacao.innerText = "";
        //Troca a cor da borda do input
        passwordLogin.style.border = "2px solid transparent"
        passwordIsValid = true;
    }
    validaLogin();
});