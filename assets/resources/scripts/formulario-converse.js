//Vetor de todos os usuários cadastrados
var usuarios = [];

//Ao carregar executa


//Pegando elemento nome via getElementByID 
var campo_nome = document.getElementById('nome');


//Guarda as informações do usuario cadastrado
var Usuario = function (nome, email, telefone, status) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.status = status;
}

//Não permitir nada além de letras ou letras acentuadas
campo_nome.addEventListener('keypress', function (e) {
    var letra = e.charCode;
    if (!(letra >= 65 && letra <= 90 ||
            letra >= 97 && letra <= 122 ||
            letra == 32 ||
            e.keyCode == 8 ||
            letra >= 224 && letra <= 246 ||
            letra >= 249 && letra <= 252)) {
        e.preventDefault();
    }
});

//Para pegar o id da mesma forma que o getElementById é necessário setar a posição do elemento,
//visto que o getElementById retorna um elemento enquanto que o Jquery retorna um objeto
$('#telefone')[0].addEventListener('keypress', function (e) {
    var c = e.charCode;
    if (!(c >= 48 && c <= 57)) {
        e.preventDefault();
    }
});

//Mensagem personalizada de erro

var form = document.getElementsByTagName('form')[0];

var campo_email = form.email;

campo_email.addEventListener('blur', function (event) {
    if (campo_email.validity.patternMismatch) {
        campo_email.setCustomValidity('Por favor digite um email válido!');
    } else {
        campo_email.setCustomValidity('');
    }
});


var getStatus = () => {
    var radio_status = document.getElementsByName('status');
    for (i in radio_status) {
        if (radio_status[i].checked) {
            if (radio_status[i].id == "ajudante") {
                return 1;
            } else {
                return 2;
            }
        }
    }
    return 0;
}


var focarEm = function (elemento) {
    $(elemento).focus();
}

//Criei essa função para o telefone, mas pode ser usada para qualquer outro tipo de String
//Como CPF, IP, ela apenas separa os números de outros caractéres 

function likeAInt(str_in) {
    var str_int = '';
    var str = str_in;

    str = semEspaco(str);

    for (i = 0; i < str.length; i++) {
        if (!isNaN(str.charAt(i))) {
            str_int += str.charAt(i);
        }
    }
    return str_int;
}

//Precisa de espaço
function claustrofobico(str_in) {
    var str = str_in;
    while (str.indexOf('-') > 0) {
        str = str.replace('-', ' ');
    }
    return str;
}

function semEspaco(str_in) {
    var str = str_in;
    while (str.indexOf(' ') > 0) {
        str = str.replace(' ', '-');
    }
    return str;
}

//Pegando o telefone
var campo_telefone = document.getElementById('telefone');

//Limpar Campos

function limparCampos() {
    campo_nome.value = "";
    campo_email.value = "";
    campo_telefone.value = "";
}

function adicionarUsuarios() {
    var nome = semEspaco(campo_nome.value);
    var email = campo_email.value;
    var telefone = likeAInt(campo_telefone.value);

    var usuario = new Usuario(nome, email, telefone, getStatus());

    usuarios.push(usuario);
}

function cadastrar() {
    (() => {
        atualizarDados();
        adicionarUsuarios();
        salvar();
        adicionarTabela(usuarios.length - 1);
    })();

    alert('Cadastrado com sucesso!');
    return false;
}

function salvar() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function atualizarDados() {
    var arrayExterno = JSON.parse(localStorage.getItem('usuarios'))
    for (i in arrayExterno) {
        usuarios[i] = arrayExterno[i];
    }
}

function adicionarTabela(i) {
    var nome = claustrofobico(usuarios[i].nome);
    var email = usuarios[i].email;
    var telefone = usuarios[i].telefone;

    if (usuarios[i].status == 1) {
        $('.dar>tbody').append('<tr><td>' + nome + '</td><td>' + email + '</td><td>' + telefone + '</td></tr>')
    } else {
        $('.receber>tbody').append('<tr><td>' + nome + '</td><td>' + email + '</td><td>' + telefone + '</td></tr>')
    }
}

function formarTabela() {
    for (i in usuarios) {
        adicionarTabela(i);
    }
}

function removerDados() {
    localStorage.removeItem('usuarios');
    formarTabela();
}

function aoIniciar() {
    atualizarDados();
    formarTabela()
    focarEm('#nome')
}
