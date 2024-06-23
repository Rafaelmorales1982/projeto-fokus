
//trocando a cor da página selecionando a tag html trocando seu atributo através javascript
const html = document.querySelector('html');

//selecionando os botoões
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');

//selecionando a classe da imagem principal para uma possível troca de imagem
const banner = document.querySelector('.app__image');

//selecionando a classe app__title para trocar o texto quando clicar nos botões
const titulo = document.querySelector('.app__title');

//selecionando todos botões
const botoes = document.querySelectorAll('.app__card-button');

//pegando o botão para começar contagem regressiva
const startPauseBt = document.getElementById('start-pause');

//colocando tempo na página
const tempoNaTela = document.getElementById('timer');

//Criando um variável para criar a parte do tempo
let tempoDecorridoEmSegundos = 1500 ;//segundo mesma coisa 25:00 minutos
let intervaloId = null;



//pegando a tag para trocar a palavra dentro do span
const iniciarOuPausarBt = document.querySelector('#start-pause span');

//selecionando o botão toggle
const musicaFocoInput = document.getElementById('alternar-musica');

//sons
const audioPlay = new Audio('./sons/play.wav');
const audioPausa = new Audio('./sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3'); 


//instancionando um novo objeto música
const musica = new Audio('./sons/luna-rise-part-one.mp3');
//tocando a musica infinitamente
musica.loop = true;
musicaFocoInput.addEventListener('change', () => {

    if(musica.paused){
        musica.play();
    }else {
        musica.pause();
    }

});


// criando um evento de click
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
    /*
    html.setAttribute('data-contexto', 'foco'); // adicionando um novo atributo para mudar a cor
    banner.setAttribute('src','/imagens/foco.png'); //adicionando uma nova imagem
  */


});

// criando um evento de click
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    //adicionando a classe active quando clicar
    curtoBt.classList.add('active');

    /*
    html.setAttribute('data-contexto', 'descanso-curto'); // adicionando um novo atributo para mudar a cor
    banner.setAttribute('src','/imagens/descanso-curto.png');//adicionando uma nova imagem
    */


});

// criando um evento de click
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');

    /*
    html.setAttribute('data-contexto','descanso-longo'); // adicionando um novo atributo para mudar a cor
    banner.setAttribute('src','imagens/descanso-longo.png');//adicionando uma nova imagem
    */

} );

//fazendo a manipulação trocando imagens e cor de fundo
function alterarContexto(contexto) {
//mostrar o tempo

mostrarTempo();

//para remover active dos botões
botoes.forEach(function(contexto){
    contexto.classList.remove('active');
});


    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);

    //switch de quando clicar nos botões troca o texto do título
    switch (contexto) {
        case "foco": titulo.innerHTML= `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            
            break;

            case "descanso-curto": titulo.innerHTML= `Que tal dar uma respirada?,<br>
            <strong class="app__title-strong">Faça uma pausa curta!.</strong>`
        
        break;

        case "descanso-longo": titulo.innerHTML= `
        Hora de voltar à superfície,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `
        break;

        default:
            
            break;
    }
}

//Criando uma função regressiva

const contagemRegressiva = () => {

    if(tempoDecorridoEmSegundos <= 0){
        zerar();
        audioTempoFinalizado.play();
        alert('Tempo finalizado');
        return;
    }

    tempoDecorridoEmSegundos -= 1; //descontando 1 segundo
   mostrarTempo();

}

//clicando no botão começar para iniciar a contagem regressiva
startPauseBt.addEventListener('click',  iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";//alterar a palavra para pausar

    
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBt = textContent = "Começar";//alterar a palavra para começar
    intervaloId = null;
}

//função mostrar na tela o tempo
function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}
    
    `
}

mostrarTempo();