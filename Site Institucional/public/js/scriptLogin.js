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

function limparFormulario() {
    // Limpar os valores dos campos de input após o cadastro
    codigo_input.value = "";
    nome_input.value = "";
    email_input.value = "";
    senha_input.value = "";
    confirmacao_senha_input.value = "";
}

function cadastrar() {
    //aguardar();

    // Recupere o valor da nova input pelo nome do id
    var codigoVar = codigo_input.value;
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmarSenha = confirmacao_senha_input.value;
    var idEmpresaVincular;

    const mensagemErro = document.getElementById("mensagem_erro");

    // Validação dos campos
    const tamanhoNome = nomeVar.length > 1;
    const emailConterArroba = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVar);
    const tamanhoSenha = senhaVar.length > 6;
    const confirmarSenhas = senhaVar == confirmarSenha;

    mensagemErro.innerHTML = "";
    mensagemErro.style.display = "none";

    // Verificando se há algum campo em branco
    if (
        nomeVar == "" ||
        codigoVar == "" ||
        emailVar == "" ||
        senhaVar == "" ||
        confirmarSenha == ""
    ) {
        mensagemErro.innerHTML = "Campos obrigatórios estão vazios";
        mensagemErro.style.display = "block";
        return false;
    } else if (!tamanhoNome) {
        mensagemErro.innerHTML = "O campo de nome deve ter mais que um caractere";
        mensagemErro.style.display = "block";
        return false;
    } else if (!emailConterArroba) {
        mensagemErro.innerHTML = "O campo de email deve conter '@' e '.'";
        mensagemErro.style.display = "block";
        return false;
    } else if (!tamanhoSenha) {
        mensagemErro.innerHTML = "A senha precisa ter mais que 6 caracteres";
        mensagemErro.style.display = "block";
        return false;
    } else if (!confirmarSenhas) {
        mensagemErro.innerHTML = "As senhas precisam ser iguais!";
        mensagemErro.style.display = "block";
        return false;
    }

    let codigoValido = false;
    for (let i = 0; i < listaEmpresasCadastradas.length; i++) {
        if (listaEmpresasCadastradas[i].codigo_ativacao == codigoVar) {
            idEmpresaVincular = listaEmpresasCadastradas[i].idEmpresa;
            console.log("Código de ativação válido.");
            codigoValido = true;
            break; // Sai do loop se o código for válido
        }
    }

    // Exibe mensagem de erro somente se o código não for encontrado
    if (!codigoValido) {
        mensagemErro.innerHTML = "Código de ativação inválido";
        mensagemErro.style.display = "block";
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idEmpresaVincularServer: idEmpresaVincular,
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                // Exibe a mensagem de sucesso
                mensagemErro.innerHTML = "Cadastro realizado com sucesso! Você será redirecionado para o login!";
                mensagemErro.style.color = "green";
                mensagemErro.style.display = "block";

                // Redireciona para o login
                setTimeout(() => {
                    window.location.href = "/login.html"; // Redirecionando para a página de login após 5 segundos
                }, 3000);

                limparFormulario(); // Chama a função para limpar os campos após o cadastro
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            mensagemErro.innerHTML = "Ocorreu um erro ao realizar o cadastro!";
            mensagemErro.style.color = "red";
            mensagemErro.style.display = "block";
        });

    // Ocultar a mensagem após 5 segundos
    setTimeout(() => {
        mensagemErro.style.display = "none";
    }, 5000);
}


// Listando empresas cadastradas 
function listar() {
    fetch("/empresa/listar", {
        method: "GET",
    })
        .then(function (resposta) {
            return resposta.json(); // Retorna o JSON resolvido
        })
        .then(function (empresas) {
            empresas.forEach((empresa) => {
                listaEmpresasCadastradas.push(empresa);

                // Exibe cada empresa individualmente no console
                console.log("Empresa adicionada:", empresa);
            });

            // Exibe a lista completa após todas as adições
            console.log("Lista de empresas cadastradas:", listaEmpresasCadastradas);
        })
        .catch(function (erro) {
            console.error(`#ERRO: ${erro}`);
        });
}

// function cadastrarEmpresa() {

//     var ruaVar = rua.value;
//     var bairroVar = bairro.value;
//     var numeroVar = numero.value;
//     var cepVar = cep.value;
//     var cidadeVar = cidade.value;
//     var cnpjVar = cnpj_input.value;

//     fetch("/empresa/cadastrarEmpresa", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             // crie um atributo que recebe o valor recuperado aqui
//             // Agora vá para o arquivo routes/empresa.js
//             ruaServer: ruaVar,
//             bairroServer: bairroVar,
//             numeroServer: numeroVar,
//             cepServer: cepVar,
//             cidadeServer: cidadeVar,
//             cnpjServer: cnpjVar
//         }),
//     })
//         .then(function (resposta) {
//             console.log("resposta: ", resposta);

//             if (resposta.ok) {
//                 cardErro.style.display = "block";

//                 mensagem_erro.innerHTML =
//                     "Cadastro da empresa realizado com sucesso! Redirecionando para tela de Login...";

//                 setTimeout(() => {
//                     window.location = "index.html";
//                 }, "2000");

//                 limparFormulario();
//             } else {
//                 throw "Houve um erro ao tentar realizar o cadastro da empresa!";
//             }
//         })
//         .catch(function (resposta) {
//             console.log(`#ERRO: ${resposta}`);
//         });

//     return false;

// }

function entrar() {
    // Pegando os valores dos campos de email e senha
    var emailVar = email_login.value;
    var senhaVar = senha_login.value;

    var mensagemErroLogin = document.getElementById("mensagem_erro_login");

    // Verificando se os campos estão vazios
    if (emailVar == "" || senhaVar == "") {
        // Exibe a mensagem de erro se os campos estiverem vazios
        mensagemErroLogin.innerHTML = "Por favor, preencha ambos os campos!";
        mensagemErroLogin.style.display = "block";

        // Impede o envio do formulário
        return false;
    } else {
        mensagemErroLogin.style.display = "none";
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    // Realiza a requisição para a autenticação
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
        console.log("ESTOU NO THEN DO entrar()!");

        if (resposta.ok) {
            resposta.json().then(json => {
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.CARGO = json.cargo;
                sessionStorage.TANQUES = JSON.stringify(json.tanques);
                sessionStorage.ID_EMPRESA = json.idEmpresa

                mensagemErroLogin.innerHTML = "Login realizado com sucesso!";
                mensagemErroLogin.style.color = "green";
                mensagemErroLogin.style.display = "block";


                if (sessionStorage.CARGO == 'Suporte N3') {
                    setTimeout(function () {
                        window.location = "bobIA.html"
                    }, 2000);
                } else {
                    setTimeout(function () {
                        window.location = "tanques.html";
                    }, 3000);
                }
            });

        } else {
            console.log("Houve um erro ao tentar realizar o login!");
            resposta.text().then(texto => {
                console.error(texto);
                mensagemErroLogin.innerHTML = "Falha no login: " + texto;
                mensagemErroLogin.style.display = "block";
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    });

    return false;
}
