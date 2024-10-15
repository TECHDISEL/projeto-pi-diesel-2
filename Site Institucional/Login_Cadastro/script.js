const botaoAbreFormularioDeCadastro = document.getElementById('cadastro');
const container = document.getElementById('container');
const botaoAbreFormularioDeLogin = document.getElementById('login');

function moverEsquerda() {
    container.classList.add('active');
}

function moverDireita() {
    container.classList.remove('active');
}

const botaoCadastro = document.getElementById('botaoCadastro');
const camposCadastro = document.querySelectorAll('#responsavel, #nomeComercial, #razaoSocial, #cnpj, #telefone, #email, #senha');

function validarCampos() {
    let todosPreenchidos = true;
    
    // Verifica se todos os campos de cadastro estão preenchidos
    camposCadastro.forEach(campo => {
        if (campo.value === '') {
            todosPreenchidos = false;
        }
    });

    const senhaValida = validarSenha();
    
    // Habilita o botão se todos os campos estiverem preenchidos e a senha for válida
    if (todosPreenchidos && senhaValida) {
        botaoCadastro.disabled = false;
    } else {
        botaoCadastro.disabled = true;
    }
}

function validarSenha() {
    const senha = document.getElementById('senha').value;
    const erro = document.getElementById('erro');
    let letraMaiuscula = false;
    let numero = false;
    let caracterEspecial = false;
    erro.innerHTML = '';

    for (let posicao = 0; posicao < senha.length; posicao++) {
        let valorAscii = senha.charCodeAt(posicao);

        // Valida se contém letras maíusculas na senha
        if (valorAscii >= 65 && valorAscii <= 90) {
            letraMaiuscula = true;
        }

        // Valida se contém números na senha
        if (valorAscii >= 48 && valorAscii <= 57) {
            numero = true;
        }

        // Valida se contém caracteres especiais
        if (valorAscii >= 33 && valorAscii <= 47) {
            caracterEspecial = true;
        }
    }

    if (senha.length < 1) {
        erro.innerHTML = '';
    } else {
        if (!letraMaiuscula || !numero || !caracterEspecial) {
            if (!letraMaiuscula) {
                erro.innerHTML += 'Inclua uma Letra maiúscula<br>';
            }
            if (!numero) {
                erro.innerHTML += 'Inclua um número<br>';
            }
            if (!caracterEspecial) {
                erro.innerHTML += 'Inclua um caracter especial: ! " # $ % & ( ) * + , - . /<br>';
            }
            return false; // Senha inválida
        }
    }
    return true; // Senha válida
}

// Adiciona o evento de checagem nos campos de cadastro
camposCadastro.forEach(campo => campo.addEventListener('input', validarCampos));
