//Vetor de murais
var mensagens = [];

var Mensagem = function (frase, data) {
    this.frase = frase;
    this.data = data;
}

var campo_mural = document.getElementsByClassName('mensagem')[0];
var campo_mensagem = document.getElementById('msg-text');

function atualizarNumeroMensagens() {
    $('.numero-mensagens')[0].innerHTML = mensagens.length;
}



campo_mural.addEventListener('keypress', function (e) {
    var letra = e.charCode;
    if (!(letra >= 65 && letra <= 90 ||
            letra >= 97 && letra <= 122 ||
            letra == 32 ||
            letra >= 48 && letra <= 57 ||
            e.keyCode == 8 ||
            letra == 33 ||
            letra == 58 ||
            letra == 59 ||
            letra == 39 ||
            letra == 44 ||
            letra == 46 ||
            letra >= 224 && letra <= 246 ||
            letra >= 249 && letra <= 252)) {
        e.preventDefault();
    }
});

function corAleatoria() {
    rnd = Math.ceil((Math.random() * 14));

    switch (rnd) {
        case 1:
            return 'blue';
        case 2:
            return 'green';
        case 3:
            return 'yellow';
        case 4:
            return 'purple';
        case 5:
            return 'blue';
        case 6:
            return 'deep-purple';
        case 7:
            return 'indigo';
        case 8:
            return 'light-blue';
        case 9:
            return 'cyan';
        case 10:
            return 'teal';
        case 11:
            return 'brown';
        case 12:
            return 'orange';
        case 13:
            return 'red'
        case 14:
            return 'blue-grey'
        default:
            return 'white';
    }
}

function adicionarMensagem(index) {

    var frase = campo_mural.value;

    //  $('.mural').append("<div class='col s12 m6 z-depth-5'>").text(campo_mural.value).append("<h6></h6></div>");
    $('.mural').append("<div class='col s12 z-depth-5 flow-text muralzinho " + corAleatoria() + " black-text'><small> " + mensagens[index].data + "</small><h4>" + mensagens[index].frase + "</h4></div>");

}

function formarMural() {
    for (i in mensagens) {
        adicionarMensagem(i);
    }
}



function salvar() {
    localStorage.setItem('mensagens', JSON.stringify(mensagens));
}

function atualizarDados() {
    var arrayExterno = JSON.parse(localStorage.getItem('mensagens'))
    for (i in arrayExterno) {
        mensagens[i] = arrayExterno[i];
    }
    atualizarNumeroMensagens();
}

function removerDados() {
    localStorage.removeItem('mensagens');
}

function postar() {


    var texto = campo_mural.value;
    var d = new Date();

    var dia = (d.getDate() >= 10) ? d.getDate() : ("0" + d.getDate());
    var mes = (d.getMonth() + 1 >= 10) ? d.getMonth() + 1 : ("0" + (d.getMonth() + 1));
    var hora = (d.getHours() >= 10) ? d.getHours() : ("0" + (d.getHours()));
    var minuto = (d.getMinutes() >= 10) ? d.getMinutes() : ("0" + d.getMinutes());
    var segundo = (d.getSeconds() >= 10) ? d.getSeconds() : ("0" + d.getSeconds());

    var str_d = `${dia}/${mes}/${d.getFullYear()} ${hora}:${minuto}:${segundo}`;

    var mensagem = new Mensagem(texto, str_d);

    if (confirm('Tem certeza que deseja postar essa mensagem?')) {
        mensagens.push(mensagem);

        salvar();

        atualizarDados();
        adicionarMensagem(mensagens.length - 1);
    }

    return false;
}

function iniciar() {
    atualizarDados();
    formarMural();
}
