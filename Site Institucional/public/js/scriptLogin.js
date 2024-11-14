const botaoAbreFormularioDeCadastro = document.getElementById('cadastro');
const container = document.getElementById('container');
const botaoAbreFormularioDeLogin = document.getElementById('login');

function continuarCadastro() {
    event.preventDefault()
    form.style.display = 'None'
    form2.style.display = 'Flex'
}

function voltar() {
    event.preventDefault()
    form.style.display = 'Flex'
    form2.style.display = 'None'
}

function moverEsquerda() {
    container.classList.add('active');
}

function moverDireita() {
    container.classList.remove('active');
}

// const botaoCadastro = document.getElementById('botaoCadastro');
// const camposCadastro = document.querySelectorAll('#responsavel, #nomeComercial, #razaoSocial, #cnpj, #telefone, #email, #senha');

// function validarCampos() {
//     let todosPreenchidos = true;

//     // Verifica se todos os campos de cadastro estão preenchidos
//     camposCadastro.forEach(campo => {
//         if (campo.value === '') {
//             todosPreenchidos = false;
//         }
//     });

//     const senhaValida = validarSenha();

//     // Habilita o botão se todos os campos estiverem preenchidos e a senha for válida
//     if (todosPreenchidos && senhaValida) {
//         botaoCadastro.disabled = false;
//     } else {
//         botaoCadastro.disabled = true;
//     }
// }

// function validarSenha() {
//     const senha = document.getElementById('senha').value;
//     const erro = document.getElementById('erro');
//     let letraMaiuscula = false;
//     let numero = false;
//     let caracterEspecial = false;
//     erro.innerHTML = '';

//     for (let posicao = 0; posicao < senha.length; posicao++) {
//         let valorAscii = senha.charCodeAt(posicao);

//         // Valida se contém letras maíusculas na senha
//         if (valorAscii >= 65 && valorAscii <= 90) {
//             letraMaiuscula = true;
//         }

//         // Valida se contém números na senha
//         if (valorAscii >= 48 && valorAscii <= 57) {
//             numero = true;
//         }

//         // Valida se contém caracteres especiais
//         if (valorAscii >= 33 && valorAscii <= 47) {
//             caracterEspecial = true;
//         }
//     }

//     if (senha.length < 1) {
//         erro.innerHTML = '';
//     } else {
//         if (!letraMaiuscula || !numero || !caracterEspecial) {
//             if (!letraMaiuscula) {
//                 erro.innerHTML += 'Inclua uma Letra maiúscula<br>';
//             }
//             if (!numero) {
//                 erro.innerHTML += 'Inclua um número<br>';
//             }
//             if (!caracterEspecial) {
//                 erro.innerHTML += 'Inclua um caracter especial: ! " # $ % & ( ) * + , - . /<br>';
//             }
//             return false; // Senha inválida
//         }
//     }
//     return true; // Senha válida
// }

// // Adiciona o evento de checagem nos campos de cadastro
// camposCadastro.forEach(campo => campo.addEventListener('input', validarCampos));


// Array para armazenar empresas cadastradas para validação de código de ativação 
let listaEmpresasCadastradas = [];

function cadastrar() {
    // aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome_input.value;
    var razaoVar = razao_input.value;
    var cnpjVar = cnpj_input.value;
    var telVar = tel_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    // validação dos campos
    const tamanhoNome = nomeVar.length > 1
    const emailConterArroba = emailVar.indexOf('@') != -1
    const tamanhoSenha = senhaVar.length > 6
    const tamanhoCNPJ = cnpjVar.length == 14

    // Verificando se há algum campo em branco
    // if (
    //     nomeVar == "" ||
    //     emailVar == "" ||
    //     senhaVar == "" ||
    //     cnpjVar == ""
    // ) {
    //     cardErro.style.display = "block";
    //     mensagem_erro.innerHTML =
    //         "Campos obrigatórios estão vazios";

    //     return false;
    // } else if (!tamanhoNome) {

    //     cardErro.style.display = "block";
    //     mensagem_erro.innerHTML =
    //         "O campo de nome deve ter mais que um caractére";

    //     return false;

    // } else if (!emailConterArroba) {

    //     cardErro.style.display = "block";
    //     mensagem_erro.innerHTML =
    //         "O campo de email deve conter @";

    //     return false;

    // } else if (!tamanhoSenha) {

    //     cardErro.style.display = "block";
    //     mensagem_erro.innerHTML =
    //         "A senha deve ter mais que 6 caractéres";

    //     return false;

    // } else if (!tamanhoCNPJ) {

    //     cardErro.style.display = "block";
    //     mensagem_erro.innerHTML =
    //         "O CPF deve conter 11 caractéres";

    //     return false;

    // } else {

    //     setInterval(sumirMensagem, 5000);

    // }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            razaoServer: razaoVar,
            cnpjServer: cnpjVar,
            telServer: telVar,
            emailServer: emailVar,
            senhaServer: senhaVar

        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                cardErro.style.display = "block";

                // mensagem_erro.innerHTML =
                //     "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                // setTimeout(() => {
                //     window.location = "index.html";
                // }, "2000");

                // limparFormulario();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function cadastrarEmpresa() {

    var ruaVar = rua.value;
    var bairroVar = bairro.value;
    var numeroVar = numero.value;
    var cepVar = cep.value;
    var cidadeVar = cidade.value;
    var cnpjVar = cnpj_input.value;

    fetch("/empresa/cadastrarEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/empresa.js
            ruaServer: ruaVar,
            bairroServer: bairroVar,
            numeroServer: numeroVar,
            cepServer: cepVar,
            cidadeServer: cidadeVar,
            cnpjServer: cnpjVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                cardErro.style.display = "block";

                mensagem_erro.innerHTML =
                    "Cadastro da empresa realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location = "index.html";
                }, "2000");

                limparFormulario();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro da empresa!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;

}

function entrar() {

    var emailVar = email_login.value;
    var senhaVar = senha_login.value;

    if (emailVar == "" || senhaVar == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";

    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log('AAAAAAAAAAAAAAAAAA')
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.CPF_USUARIO = json.cpf;
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.TANQUES = JSON.stringify(json.tanques)

                setTimeout(function () {
                    window.location = "./dashboard.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}