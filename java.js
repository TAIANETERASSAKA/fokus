const html = document.querySelector('html')
const focoB = document.querySelector('.app__card-button')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo =document.querySelector('.app__title')
const botoes =document.querySelectorAll('.app__card-button')
const musicaFocoInput =document.querySelector('#alternar-musica')
const musica= new Audio ('sons/luna-rise-part-one.mp3')
const musicaPause= new Audio ('sons/pause.mp3')
const musicaPlay= new Audio ('sons/play.wav')
musica.loop = true //fazer a musica repetir
const startPause= document.querySelector('#start-pause')
const botaoTempo= document.querySelector('#start-pause span')
const imagemBotaoTempo= document.querySelector('.app__card-primary-butto-icon')
const tempoTela= document.querySelector('#timer')

let tempoDecorridoEmSegundos = 1500 //25min em milissegundos
let intervaloId = null

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    } else{
        musica.pause()
    }
})

//curtoBt.addEventListener('click', () => {
//    html.setAttribute('data-contexto', 'descanso-curto')
//    banner.setAttribute('src', 'imagens/descanso-curto.png')
//})

//longoBt.addEventListener('click', () => {
//    html.setAttribute('data-contexto', 'descanso-longo')
//    banner.setAttribute('src', 'imagens/descanso-longo.png')
//})


//focoB.addEventListener('click', () => {
//  html.setAttribute('data-contexto', 'foco')
//    banner.setAttribute('src', 'imagens/foco')
//})

//podemos simplificar o codigo usando uma funcao

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    AlterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    AlterarContexto('descanso-longo')
    longoBt.classList.add('active')
})


focoB.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    AlterarContexto('foco')
    focoB.classList.add('active')
})

function AlterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
            titulo.innerHTML=
            `Otimize sua produtividade<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
        break;
        case "descanso-curto":
            titulo.innerHTML=
            `Que tal dar uma respirada?
            <strong class="app__title-strong"> Faça uma pausa curta!</strong>`
        break;
        case "descanso-longo":
            titulo.innerHTML=
            `Hora de voltar à superfície
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        break;

    }
}

const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegundos<=0){
        alert('Tempo Finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -=1
    mostrarTempo()
}

startPause.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){ //interrompe a contagem caso ela n tenha acabado
        musicaPause.play()
        imagemBotaoTempo.setAttribute('src', 'imagens/play_arrow.png')
        zerar()
        return
    }
    intervaloId= setInterval(contagemRegressiva,1000)  //setInterval funcao que estabelece intervalo, o primeiro valor recebido é onde esse intervalo vai ser inserido, e o segundo valor é a duração do invervalo lido em milisegundos logo 1seg=1000
    musicaPlay.play()
    botaoTempo.textContent="Pausar"
    imagemBotaoTempo.setAttribute('src', 'imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId) //clearInterval é a funcao interrompe um codigo
    botaoTempo.textContent= "Começar"
    intervaloId= null
}

function mostrarTempo(){
    const tempo= new Date(tempoDecorridoEmSegundos * 1000) 
    const tempoFormatado= tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'}) //formatando tempo
    tempoTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()