const emojis = ["👸", "🐶", "🤖", "🍌", "👻", "👽", "🌟", "❤️"];

let cartas = [];              // Array com os emojis embaralhados
let cartasViradas = [];       // Array que marca qual carta foi virada (true/false)
let errosConsecutivos = 0;    // Contador de erros seguidos
let paresAcertados = 0;       // Contador de pares encontrados
let primeiraCarta = null;     // Índice da primeira carta escolhida
let esperandoSegunda = false; // Flag para saber se está esperando a segunda carta

const tabuleiro = document.getElementById('tabuleiro');
const mensagem = document.getElementById('mensagem');
const paresSpan = document.getElementById('pares-acertados');
const errosSpan = document.getElementById('erros-consecutivos');
const reiniciarBtn = document.getElementById('reiniciar');

function inicializarJogo() {
  // Limpa o array de cartas
  cartas = [];

  // Para cada emoji no array, adiciona 2 vezes
  for (let i = 0; i < emojis.length; i++) {
    cartas.push(emojis[i]);
    cartas.push(emojis[i]);
  }

  embaralhar();

  // Cria um array com 16 posições, todas false
  // false = carta não foi virada
  cartasViradas = new Array(16).fill(false);

  errosConsecutivos = 0;
  paresAcertados = 0;
  primeiraCarta = null;
  esperandoSegunda = false;

  atualizarPlacar();
  criarTabuleiro();
  mensagem.textContent = "Clique em uma carta para começar!";
}

function embaralhar() {
  for (let a = cartas.length - 1; a > 0; a--) {
    // Sorteia um número aleatório
    const b = Math.floor(Math.random() * (a + 1));

    // Troca as posições
    const temp = cartas[a];        // Guarda a carta em a
    cartas[a] = cartas[b];         // Coloca a carta de b em a
    cartas[b] = temp;              // Coloca a carta guardada em b
  }
}

function criarTabuleiro() {
  tabuleiro.innerHTML = '';
  for (let i = 0; i < 16; i++) {
    const carta = document.createElement('div');
    carta.className = 'carta';
    carta.dataset.index = i;
    carta.textContent = (i + 1).toString().padStart(2, '0');
    carta.addEventListener('click', () => escolherCarta(i));
    tabuleiro.appendChild(carta);
  }
}

function atualizarPlacar() {
  paresSpan.textContent = paresAcertados;
  errosSpan.textContent = errosConsecutivos;
}

function atualizarTabuleiro() {
  const cartasElements = document.querySelectorAll('.carta');
  cartasElements.forEach((carta, index) => {
    if (cartasViradas[index]) {
      carta.textContent = cartas[index];
      carta.classList.add('virada');
    } else {
      carta.textContent = (index + 1).toString().padStart(2, '0');
      carta.classList.remove('virada');
    }
  });
}

function verificarVitoria() {
  // Se acertou 8 pares, significa que ganhou
  if (paresAcertados === 8) {
    return true;
  }
  return false;
}

function verificarDerrota() {
  // Se erros consecutivos chegou a 5, perdeu
  if (errosConsecutivos >= 5) {
    return true;
  }
  return false;
}

function escolherCarta(indice) {
  if (cartasViradas[indice] || esperandoSegunda) {
    return; // Carta já virada ou esperando segunda
  }

  cartasViradas[indice] = true;
  atualizarTabuleiro();

  if (primeiraCarta === null) {
    // Primeira carta
    primeiraCarta = indice;
    mensagem.textContent = "Agora clique na segunda carta!";
  } else {
    // Segunda carta
    esperandoSegunda = true;
    mensagem.textContent = "Verificando...";

    setTimeout(() => {
      if (cartas[primeiraCarta] === cartas[indice]) {
        // Acertou
        mensagem.textContent = "✅ Acertou! As cartas são iguais! ✅";
        paresAcertados++;
        errosConsecutivos = 0;
        atualizarPlacar();

        if (verificarVitoria()) {
          mensagem.textContent = "🎉 Parabéns! Você venceu! 🎉";
          reiniciarBtn.style.display = 'block';
        }
      } else {
        // Errou
        mensagem.textContent = "❌ Errou! As cartas são diferentes. ❌";
        cartasViradas[primeiraCarta] = false;
        cartasViradas[indice] = false;
        errosConsecutivos++;
        atualizarPlacar();
        atualizarTabuleiro();

        if (verificarDerrota()) {
          mensagem.textContent = "💀 Você perdeu! Tente novamente. 💀";
          reiniciarBtn.style.display = 'block';
        }
      }

      primeiraCarta = null;
      esperandoSegunda = false;
    }, 1000); // Delay para mostrar a segunda carta
  }
}

reiniciarBtn.addEventListener('click', () => {
  reiniciarBtn.style.display = 'none';
  inicializarJogo();
});

// Inicia o jogo
inicializarJogo();