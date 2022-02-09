var jogadorDistanciaTop = 0;
var jogadorDistanciaTopComAltura = 50;
var jogadorDistanciaLeft = 0;
var jogadorDistanciaLeftComLargura = 50;

var contadorId = 0;

window.onload = () => {
    
    let distanciaTopo = 0;

    let bloco = document.querySelector('.carro');
    bloco.style.top = distanciaTopo;

    document.addEventListener('keydown', (keyEvent) => {
        
        if (keyEvent.key == '0') {
            distanciaTopo = 0;
            bloco.style.top = distanciaTopo;
        }

        if (keyEvent.key == 'ArrowUp') {
            distanciaTopo -= 50
            bloco.style.top = distanciaTopo;
        }

        if (keyEvent.key == 'ArrowDown') {
            distanciaTopo += 50
            bloco.style.top = distanciaTopo;
        }

        jogadorDistanciaTop = distanciaTopo;
        jogadorDistanciaTopComAltura = jogadorDistanciaTop + 100;
    });

    setInterval(() => CriarObstaculos(), 3000);
}

function CriarObstaculos() {

    let obstaculo = document.createElement('div');
    obstaculo.id = 'obstaculo-' + contadorId++;
    obstaculo.style.width = '150px';
    obstaculo.style.height = '70px';
    obstaculo.style.position = 'absolute'
    obstaculo.style.backgroundImage = 'url(\'caminhao.png\')';
    obstaculo.style.backgroundRepeat = 'no-repeat';
    obstaculo.style.backgroundSize = 'contain';
    obstaculo.style.transition = '0.2s';
    obstaculo.style.top = Math.random() * 500;
    obstaculo.style.left = document.body.offsetWidth;

    document.body.appendChild(obstaculo);

    MovimentarObstaculo(obstaculo);
}

function MovimentarObstaculo(obstaculo) {
    setInterval(() => {
        let posicaoAtual = parseFloat(obstaculo.style.left);
        obstaculo.style.left = (posicaoAtual - 50);

        VerificarSeObstaculoColidiuComOJogador(obstaculo);
    }, 100);
}

function VerificarSeObstaculoColidiuComOJogador(obstaculo) {
    let obstaculoDistanciaTop = parseInt(obstaculo.style.top);
    let obstaculoDistanciaTopComAltura = obstaculoDistanciaTop + parseInt(obstaculo.style.height);
    let obstaculoDistanciaLeft = parseInt(obstaculo.style.left);

    let colidirParteSuperior = jogadorDistanciaTop >= obstaculoDistanciaTop &&
                               jogadorDistanciaTop <= obstaculoDistanciaTopComAltura; 

    let colidirParteInferior = jogadorDistanciaTopComAltura >= obstaculoDistanciaTop &&
                               jogadorDistanciaTopComAltura <= obstaculoDistanciaTopComAltura; 

    let colidirParteLateralDireita = jogadorDistanciaLeftComLargura >= obstaculoDistanciaLeft && obstaculoDistanciaLeft > 0;

    if ((colidirParteSuperior || colidirParteInferior) && colidirParteLateralDireita)
        Colidiu();
}

function Colidiu() {
    console.log('Colisão!');
}
