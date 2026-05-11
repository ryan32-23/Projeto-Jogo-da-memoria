# Jogo da Memória 🎮

Projeto original: um jogo da memória em JavaScript que roda no terminal.

Agora o projeto também inclui uma versão web criada a partir da lógica do jogo de terminal.

---

## 🚀 Demo Online

A versão web está publicada em:

https://site-jogo-da-memoria-nu.vercel.app/

---

## 📁 Estrutura do Projeto

```
├── package.json          # Configuração e script de execução do jogo no terminal
├── index.js              # Lógica do jogo para terminal
├── README.md             # Documentação do projeto
└── Site-Jogo/            # Versão web do jogo
    ├── index.html        # Interface web do jogo
    ├── styles.css        # Estilos visuais do jogo
    └── script.js         # Lógica do jogo no navegador
```

---

## 💻 Jogo no Terminal

### Requisitos

- Node.js instalado

### Instalação

```bash
npm install
```

### Como executar

```bash
npm start
```

ou

```bash
node index.js
```

### Como jogar

- O tabuleiro tem 16 cartas (8 pares)
- Cada carta é identificada por um número de `1` a `16`
- Digite o número da carta que deseja virar
- Vire duas cartas por rodada
- Se o par for igual, as cartas permanecem viradas
- Se o par for diferente, as cartas voltam a ficar viradas para baixo
- O jogo termina quando todos os pares são encontrados ou quando você erra 5 vezes consecutivas

---

## 🌐 Versão Web

A versão web está disponível dentro da pasta `Site-Jogo/`.

### Como usar localmente

- Abra `Site-Jogo/index.html` no navegador
- Ou use um servidor local para ter suporte a recursos de navegador moderno

### Recursos da versão web

- Tabuleiro 4x4 com cartas clicáveis
- Cartas viram mostrando emoji
- Exibição de placar em tempo real
- Mensagens para acertos, erros e vitória/derrota
- Botão para reiniciar o jogo

---

## 🎮 Regras do Jogo

- O jogo possui 8 pares de cartas (16 no total)
- Todas as cartas começam viradas para baixo, mostrando um número
- Escolha duas cartas por rodada
- Se as cartas forem iguais, o par permanece virado
- Se forem diferentes, as cartas voltam a ficar escondidas
- Você vence ao encontrar todos os pares
- Você perde se errar 5 vezes seguidas

---

## 🔧 Tecnologias Usadas

- JavaScript
- HTML
- CSS
- Node.js (para versão de terminal)

---

## 📌 Observações

- A versão do terminal usa `readline-sync` para entradas de usuário
- A versão web usa a mesma lógica básica de memória e pares, mas adaptada para eventos de clique no navegador
