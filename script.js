const questions = [
  {
    category: "IA NOS JOGOS",
    question: "Em um jogo, qual é um exemplo de uso de IA para controlar inimigos?",
    answers: [
      "Fazer o inimigo reagir à posição e às ações do jogador",
      "Aumentar o brilho da tela automaticamente",
      "Trocar a música por uma playlist aleatória",
      "Desligar o controle quando o jogador perde"
    ],
    correct: 0,
    explanation: "Isso mesmo! A IA pode ajudar personagens controlados pelo jogo a procurar o jogador, se proteger ou escolher ações conforme a situação."
  },
  {
    category: "MUNDOS VIRTUAIS",
    question: "O que significa dizer que um jogo tem NPCs com comportamento adaptativo?",
    answers: [
      "Todos os NPCs repetem exatamente a mesma fala",
      "Os personagens podem mudar suas ações de acordo com o contexto",
      "Os NPCs só aparecem durante a tela de carregamento",
      "O jogo funciona sem regras nem programação"
    ],
    correct: 1,
    explanation: "NPCs adaptativos podem reagir a escolhas, eventos ou condições do jogo. Isso não quer dizer que eles tenham consciência."
  },
  {
    category: "ANIME E ANIMAÇÃO",
    question: "Como ferramentas de IA podem ajudar na produção de animações?",
    answers: [
      "Eliminando a necessidade de artistas em qualquer projeto",
      "Garantindo que toda animação fique perfeita automaticamente",
      "Ajudando em tarefas como interpolar movimentos, limpar imagens ou organizar referências",
      "Transformando qualquer roteiro em um anime oficial sem autorização"
    ],
    correct: 2,
    explanation: "Ferramentas de IA podem agilizar etapas específicas, mas a direção artística, a revisão e as decisões humanas continuam importantes."
  },
  {
    category: "CRIAÇÃO DE PERSONAGENS",
    question: "Você quer criar um personagem original para seu próprio jogo. Como a IA pode ajudar?",
    answers: [
      "Gerando ideias de aparência, personalidade e história para você desenvolver",
      "Decidindo sozinha todos os detalhes e proibindo mudanças",
      "Copiando obrigatoriamente um personagem famoso",
      "Garantindo que o personagem será popular"
    ],
    correct: 0,
    explanation: "A IA pode funcionar como parceira de brainstorming. Você escolhe o que combina com sua visão e transforma as ideias em algo próprio."
  },
  {
    category: "MÚSICA DE JOGOS",
    question: "Qual é uma forma responsável de usar IA para ajudar a criar uma trilha sonora?",
    answers: [
      "Imitar exatamente uma música conhecida e dizer que é totalmente original",
      "Usar a ferramenta para explorar ideias e conferir as permissões dos materiais utilizados",
      "Usar qualquer música encontrada na internet sem verificar direitos",
      "Deixar a IA decidir tudo e nunca ouvir o resultado"
    ],
    correct: 1,
    explanation: "A IA pode ajudar a experimentar climas e ideias musicais. É importante revisar o resultado e respeitar direitos autorais e licenças."
  },
  {
    category: "LIMITES DA IA",
    question: "Uma IA inventou detalhes sobre a história de um anime. O que você deve fazer?",
    answers: [
      "Acreditar, porque IA nunca erra",
      "Tratar a resposta como teoria oficial",
      "Conferir em fontes confiáveis, como materiais oficiais ou episódios",
      "Repassar a informação sem avisar ninguém"
    ],
    correct: 2,
    explanation: "IA pode produzir informações falsas com bastante confiança. Para saber o que é cânone, confira fontes oficiais e separe fatos de teorias."
  },
  {
    category: "CRIATIVIDADE HUMANA",
    question: "Qual é a melhor maneira de combinar criatividade humana e IA ao desenvolver um jogo?",
    answers: [
      "Usar a IA como apoio e manter decisões criativas, testes e revisão no processo",
      "Aceitar qualquer resultado sem avaliar",
      "Evitar testar o jogo com pessoas",
      "Pedir que a IA copie o jogo favorito inteiro"
    ],
    correct: 0,
    explanation: "A IA pode acelerar algumas tarefas, mas uma boa experiência depende de escolhas criativas, testes, acessibilidade e cuidado com o público."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const startButton = document.querySelector("#start-btn");
const nextButton = document.querySelector("#next-btn");
const restartButton = document.querySelector("#restart-btn");
const questionCounter = document.querySelector("#question-counter");
const scoreLabel = document.querySelector("#score-label");
const progressFill = document.querySelector("#progress-fill");
const category = document.querySelector("#category");
const questionText = document.querySelector("#question-text");
const answersContainer = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");

function iniciarJogo() {
  currentQuestion = 0;
  score = 0;
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  mostrarPergunta();
}

function mostrarPergunta() {
  answered = false;
  const item = questions[currentQuestion];
  questionCounter.textContent = `PERGUNTA ${currentQuestion + 1}/${questions.length}`;
  scoreLabel.textContent = `PONTOS: ${score}`;
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  category.textContent = item.category;
  questionText.textContent = item.question;
  answersContainer.replaceChildren();
  feedback.textContent = "";
  feedback.classList.add("hidden");
  nextButton.classList.add("hidden");

  item.answers.forEach((answerText, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.innerHTML = `<span class="letter">${String.fromCharCode(65 + index)}</span><span></span>`;
    button.querySelector("span:last-child").textContent = answerText;
    button.addEventListener("click", () => verificarResposta(index, button));
    answersContainer.appendChild(button);
  });
}

function verificarResposta(selectedIndex, selectedButton) {
  if (answered) return;
  answered = true;

  const item = questions[currentQuestion];
  const buttons = [...answersContainer.querySelectorAll(".answer")];
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) button.classList.add("correct");
  });

  if (selectedIndex === item.correct) {
    score++;
    scoreLabel.textContent = `PONTOS: ${score}`;
    feedback.textContent = `Resposta certa! ${item.explanation}`;
  } else {
    selectedButton.classList.add("wrong");
    feedback.textContent = `Quase! ${item.explanation}`;
  }

  feedback.classList.remove("hidden");
  nextButton.textContent = currentQuestion === questions.length - 1 ? "Ver resultado ★" : "Próxima pergunta →";
  nextButton.classList.remove("hidden");
}

function mostrarResultado() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  progressFill.style.width = "100%";
  document.querySelector("#final-score").textContent = `${score}/${questions.length} pontos`;

  let title = "Boa tentativa!";
  let message = "Você já deu os primeiros passos. Jogue novamente para fixar as ideias.";
  if (score >= 6) {
    title = "Missão dominada!";
    message = "Você mandou muito bem! Já entende várias formas de usar IA em games, animação e criação — sem esquecer que ela também tem limites.";
  } else if (score >= 4) {
    title = "Bom trabalho!";
    message = "Você pegou várias ideias importantes. Mais uma rodada e você pode dominar o assunto!";
  }

  document.querySelector("#result-title").textContent = title;
  document.querySelector("#result-text").textContent = message;
}

startButton.addEventListener("click", iniciarJogo);
nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
});
restartButton.addEventListener("click", iniciarJogo);
