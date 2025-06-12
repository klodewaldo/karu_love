function showSection(sectionId) {
  document.getElementById('home').classList.add('d-none');
  document.getElementById('memory').classList.add('d-none');
  document.getElementById('mural').classList.add('d-none');
  document.getElementById(sectionId).classList.remove('d-none');
}

// Tempo de relacionamento
const startDate = new Date('2025-01-15T00:00:00');
function atualizarTempoAmor() {
  const agora = new Date();
  const diff = agora - startDate;
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById("tempo-amor").innerText =
    `Há ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos meu mundo ganhou cor, e meu coração um lar.`;
}
setInterval(atualizarTempoAmor, 1000);

// Mural
const muralInfo = [
  "AMO ESSA NOSSA FOTO",
  "AMO TE ENCONTRAR",
  "AMO TE LEVAR DE MOTO",
  "AMO PASSEAR CONTIGO",
  "AMO VIAJAR COM VOCE",
  "AMO NOSSAS CARAS E BOCAS",
  "AMO ME DIVERTIR COM VOCE",
  "AMO SAIR NA SUA PRESENÇA ",
  "AMO ESTAR AO SEU LADO"
];

function carregarMural() {
  const mural = document.getElementById("mural-board");
  mural.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    mural.innerHTML += `
      <div class="mural-card" onclick="this.classList.toggle('flip')">
        <div class="card-face card-front">
          <img src="img/foto${i + 1}.jpg" class="img-fluid">
        </div>
        <div class="card-face card-back">
          <span>${muralInfo[i]}</span>
        </div>
      </div>
    `;
  }
}
carregarMural();

// Jogo da Memória
const combinacoes = [
  { img: "1", msg: "NOSSO ACAI NO CARNAVAL ❤️" },
  { img: "2", msg: "FOTO ANTES DO LANCHE 💫" },
  { img: "3", msg: "PRIMEIRO PASSEIO COM AZULZINHA 😍" },
  { img: "4", msg: "MOMENTO FELIZ NO HOP ANTES DE SE MOLHAR 💕" },
  { img: "5", msg: "NOSSO PRIMEIRO PASSEIO" },
  { img: "6", msg: "UMA PAUSA ANTES DO HOP PARA CAFE" },
  { img: "7", msg: "FOTO LINDA COM A RODA NO FUNDO" },
  { img: "8", msg: "A MAIS RECENTE UMA DESTINHA JUNINA" },
  { img: "9", msg: "NOSSO PARQUE AQUATICO K K K " }
];

let flipped = [];
let matched = [];
let matchedMessages = new Map();

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function montarJogo() {
  flipped = [];
  matched = [];
  matchedMessages.clear();
  const board = document.getElementById("memory-board");
  board.innerHTML = "";
  const duplicadas = [...combinacoes, ...combinacoes];
  const embaralhadas = embaralhar(duplicadas);

  embaralhadas.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "memory-card";
    div.dataset.index = index;
    div.dataset.img = card.img;
    div.dataset.msg = card.msg;
    div.innerHTML = `
      <div class="card-face card-front"></div>
      <div class="card-face card-back">
        <img src="img/foto${card.img}.jpg" class="img-fluid">
      </div>
    `;
    div.addEventListener("click", () => {
      if (matched.includes(div)) {
        exibirMensagemModal(card.msg);
        return;
      }
      virarCarta(div, card);
    });
    board.appendChild(div);
  });
}

function exibirMensagemModal(msg) {
  document.getElementById("mensagemModalBody").innerText = msg;
  const modal = new bootstrap.Modal(document.getElementById('mensagemModal'));
  modal.show();
}

function virarCarta(div, card) {
  if (flipped.length === 2 || matched.includes(div)) return;
  div.classList.add("flip");
  flipped.push({ el: div, data: card });

  if (flipped.length === 2) {
    const [a, b] = flipped;
    if (a.data.img === b.data.img && a.el !== b.el) {
      matched.push(a.el, b.el);
      matchedMessages.set(a.el, a.data.msg);
      matchedMessages.set(b.el, b.data.msg);
      setTimeout(() => exibirMensagemModal(a.data.msg), 300);
    } else {
      setTimeout(() => {
        a.el.classList.remove("flip");
        b.el.classList.remove("flip");
      }, 800);
    }
    flipped = [];
  }
}

montarJogo();
