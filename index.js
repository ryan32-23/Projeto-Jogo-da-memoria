const readlineSync = require('readline-sync');


const emojis = ["👸", "🐶", "🤖", "🍌", "👻", "👽", "🌟", "❤️"];


let cartas = [];              // Array com os emojis embaralhados
let cartasViradas = [];       // Array que marca qual carta foi virada (true/false)
let errosConsecutivos = 0;    // Contador de erros seguidos
let paresAcertados = 0;       // Contador de pares encontrados


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
  
  console.log("✅ Jogo inicializado!");
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


function exibirTabuleiro() {
  console.clear();
  
  // Cabeçalho
  console.log("\n╔════════════════════════════════════════════════╗");
  console.log("║           🎮 JOGO DA MEMÓRIA 🎮               ║");
  console.log("╚════════════════════════════════════════════════╝\n");
  
  // Placar
  console.log("Pares acertados: " + paresAcertados + "/8");
  console.log("Erros consecutivos: " + errosConsecutivos + "/5\n");
  console.log("Tabuleiro:\n");
  
  // Desenha as 16 cartas em 4 linhas de 4
  for (let i = 0; i < 16; i++) {
    // A cada 4 cartas, quebra linha
    if (i > 0 && i % 4 === 0) {
      console.log(); 
    }
    
    // Mostra o emoji se foi virada, senão mostra o número
    if (cartasViradas[i] === true) {
      // Carta foi virada - mostra o emoji
      process.stdout.write("  " + cartas[i] + "  ");
    } else {
      // Carta não foi virada - mostra o número (01, 02, etc)
      const numero = i + 1;
      process.stdout.write("  " + numero.toString().padStart(2, "0") + "  ");
    }
  }
  
  console.log("\n");
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


function escolherCarta() {
  // Pede um número ao jogador
  const input = readlineSync.question("Escolha uma carta (1-16): ");
  
  // Converte o texto em número
  const numero = parseInt(input);
  
  // VALIDAÇÃO 1: Verifica se é um número válido entre 1 e 16
  if (isNaN(numero) || numero < 1 || numero > 16) {
    console.log("❌ Número inválido! Escolha um número entre 1 e 16.");
    readlineSync.question("Pressione ENTER para continuar...");
    
    // Chama a função novamente (Continua pedindo até o usuário digitar algo válido)
    return escolherCarta();
  }
  
  // VALIDAÇÃO 2: Verifica se a carta já foi virada
  const indice = numero - 1;  // Converte para índice do array
  if (cartasViradas[indice] === true) {
    console.log("❌ Essa carta já foi virada! Escolha outra.");
    readlineSync.question("Pressione ENTER para continuar...");
    return escolherCarta();  // Chama novamente
  }
  
  // Se passou em todas as validações, retorna o índice
  return indice;
}


function jogar() {
  // Exibe o tabuleiro
  exibirTabuleiro();
  
  // ========== PRIMEIRA CARTA ==========
  const indice1 = escolherCarta();
  cartasViradas[indice1] = true;  // Marca como virada
  
  exibirTabuleiro();
  console.log("Primeira carta: " + cartas[indice1]);
  readlineSync.question("Pressione ENTER para escolher a segunda carta...");
  
  // ========== SEGUNDA CARTA ==========
  const indice2 = escolherCarta();
  cartasViradas[indice2] = true;  // Marca como virada
  
  exibirTabuleiro();
  console.log("Primeira carta: " + cartas[indice1]);
  console.log("Segunda carta: " + cartas[indice2]);
  
  // ========== VERIFICA SE ACERTOU ==========
  if (cartas[indice1] === cartas[indice2]) {
    // AS CARTAS SÃO IGUAIS - ACERTOU!
    console.log("✅ Acertou! As cartas são iguais!");
    
    paresAcertados++;              // Aumenta contador de acertos
    errosConsecutivos = 0;         // Reseta erros (foi acerto!)
    
    // Verifica se venceu
    if (verificarVitoria()) {
      return "vitoria";  // Retorna que venceu
    }
  } else {
    // AS CARTAS SÃO DIFERENTES - ERROU!
    console.log("❌ Errou! As cartas são diferentes.");
    
    // Vira as cartas para baixo novamente
    cartasViradas[indice1] = false;
    cartasViradas[indice2] = false;
    
    errosConsecutivos++;  // Aumenta contador de erros
    
    // Verifica se perdeu
    if (verificarDerrota()) {
      return "derrota";  // Retorna que perdeu
    }
  }
  
  readlineSync.question("Pressione ENTER para continuar...");
  return "continuar";  // Retorna que continua o jogo
}


// Mostra a tela de vitória
function exibirVitoria() {
  console.clear();
  console.log("\n╔════════════════════════════════════════════════╗");
  console.log("║         🎉 PARABÊNS VOCÊ VENCEU! 🎉        ║");
  console.log("║       Todos os pares foram encontrados!      ║");
  console.log("╚════════════════════════════════════════════════╝\n");
}

// Mostra a tela de derrota
function exibirDerrota() {
  console.clear();
  console.log("\n╔════════════════════════════════════════════════╗");
  console.log("║             💀 VOCÊ PERDEU! 💀              ║");
  console.log("║    Atingiu o limite de 5 erros consecutivos! ║");
  console.log("║              Tente novamente!                ║");
  console.log("╚════════════════════════════════════════════════╝\n");
}

// Função principal que controla o fluxo do jogo
function iniciar() {
  // while (true) = loop infinito
  while (true) {
    // Executa uma rodada
    const resultado = jogar();
    
    // Verifica o resultado
    if (resultado === "vitoria") {
      exibirVitoria();
      break;  // Sai do loop
    } else if (resultado === "derrota") {
      exibirDerrota();
      break;  // Sai do loop
    }
    // Se resultado é "continuar", volta ao início do loop
  }
}

// Prepara o jogo
inicializarJogo();

// Começa a jogar
iniciar();
