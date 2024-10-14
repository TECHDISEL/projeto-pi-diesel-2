const botaoCadastro = document.getElementById('cadastro');
const container = document.getElementById('container');
const botaoLogin = document.getElementById('login');

function moverEsquerda() {
    container.classList.add('active');
}

function moverDireita() {
    container.classList.remove('active');
}

function validarSenha() {
    const senha = document.getElementById('senha').value
    const erro = document.getElementById('erro')
    var letraMaiuscula = false
    var numero = false
    var caracterEspecial = false
    erro.innerHTML = ''

    for (var posicao = 0; posicao < senha.length; posicao++) {
        var valorAscii = senha.charCodeAt(posicao)

        // Validação se contém letras maíusculas na senha
        if (valorAscii >= 65 && valorAscii <= 90) {
            letraMaiuscula = true
        }

        // Validação se contém números na senha
        if (valorAscii >= 48 && valorAscii <= 57) {
            numero = true
        }

        // Validação se contém caracteres especiais
        if (valorAscii >= 33 && valorAscii <= 47) {
            caracterEspecial = true
        }
    }
    
    if (senha.length < 1){
        erro.innerHTML = ''
    } else {
        if (!letraMaiuscula) {
            erro.innerHTML += 'Inclua uma Letra maiúscula<br>'
        }
    
        if (!numero) {
            erro.innerHTML += 'Inclua um número<br>'
        }
    
        if (!caracterEspecial) {
            erro.innerHTML += 'Inclua um caracter especial: ! " # $ % & ( ) * + , - . / <br>'
        }
    }

}
