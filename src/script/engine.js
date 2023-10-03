const estado = {
  visual: {
    quadrado: document.querySelectorAll(".quadrado-linha"),
    inimigo: document.querySelector(".inimigo"),
    tempo: document.querySelector("#tempo"),
    pontos: document.querySelector("#pontos"),
    vida: document.querySelector("#vida"),
    tempo: document.querySelector("#tempo"),
  },
  valor: {
    tempoId: null,
    velocidadeJogo: 1000,
    hitInimigo: null,
    result: 0,
    vida: 3,
    tempo: 15,
  },
  acao: {
    contagemTempo: setInterval(tempoCorrido, 1000),
    moverInimigo: setInterval(randomQuadrado, 1000),
  },
};

function randomQuadrado() {
  estado.visual.quadrado.forEach((quadrado) => {
    quadrado.classList.remove("inimigo");
  });
  const numeroSelecionado = Math.floor(Math.random() * 9);
  const quadradoEnimigo = estado.visual.quadrado[numeroSelecionado];
  quadradoEnimigo.classList.add("inimigo");
  estado.valor.hitInimigo = quadradoEnimigo.id;
}
function clickQuadrado() {
  estado.visual.quadrado.forEach((quadrado) => {
    quadrado.addEventListener("mousedown", () => {
      if (quadrado.id === estado.valor.hitInimigo) {
        estado.valor.result++;
        estado.visual.pontos.innerHTML = estado.valor.result;
        estado.valor.hitInimigo = null;
        audio();
      } else {
        estado.valor.vida--;
        estado.visual.vida.innerHTML = estado.valor.vida;
        if (estado.valor.vida <= 0) {
          clearInterval(estado.acao.contagemTempo);
          clearInterval(estado.acao.moverInimigo);
          alert("Fim das vidas!");
          location.reload();
        }
      }
    });
  });
}
function tempoCorrido() {
  estado.valor.tempo--;
  estado.visual.tempo.innerHTML = estado.valor.tempo;
  if (estado.valor.tempo <= 0) {
    clearInterval(estado.acao.contagemTempo);
    clearInterval(estado.acao.moverInimigo);
    alert("Fim do tempo você fez " + estado.valor.result + "!");
    location.reload();
  }
}
function audio() {
  let audioPlay = new Audio("../src/audio/hit.m4a");
  audioPlay.volume = 0.2;
  audioPlay.play();
}

function init() {
  clickQuadrado();
}
init();
