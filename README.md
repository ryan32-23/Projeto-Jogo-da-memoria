# Jogo da Memória 🎮

Um jogo da memória interativo em JavaScript que roda no terminal.

## Requisitos

- Node.js instalado na sua máquina

## Instalação

```bash
npm install
```

## Como Executar

```bash
node index.js
```

## Regras do Jogo

- O jogo possui 8 pares de cartas (16 no total)
- Todas as cartas começam viradas para baixo, mostrando seu número de identificação (1-16)
- Digite o número da carta que deseja virar
- Quando você vira duas cartas:
  - Se forem iguais (par correto): elas permanecem viradas para cima e você ganha um ponto
  - Se forem diferentes: as cartas viram novamente para baixo
- Você **VENCE** quando encontrar todos os 8 pares
- Você **PERDE** se errar 5 vezes consecutivas

## Emojis Utilizados

- 👸 Princesa
- 🐶 Cachorro
- 🤖 Robô
- 🍌 Banana
- 👻 Fantasma
- 👽 ET
- 🌟 Estrela
- ❤️ Coração

## Conceitos de JavaScript Utilizados

### Variáveis e Arrays
```javascript
let cartas = [];           // Armazena os emojis
let cartasViradas = [];    // Rastreia cartas viradas
```

### Funções
```javascript
function jogar() {
  // Código aqui
}
```

### Estruturas de Controle
- **if/else**: Para tomar decisões (acertou/errou)
- **for**: Para repetir código um número de vezes
- **while**: Para continuar enquanto uma condição for verdadeira

### Arrays e Índices
- Armazenar múltiplos valores em um array
- Acessar valores com índice: `cartas[0]`, `cartas[1]`

### Recursão
- Funções que chamam a si mesmas (quando entrada é inválida)

### Algoritmo Fisher-Yates
- Embaralha as cartas de forma aleatória

## Estrutura do Projeto

```
├── package.json      # Dependências do projeto
├── index.js          # Arquivo principal do jogo
└── README.md         # Este arquivo
```
