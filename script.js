let answered = 0;
let answering = 0;
let AMOUNT_OF_ANSWERS = 5;
let isTheRightAnswer = false;
let points = 1;

let questions_image = [
  "imagens/questions/1.jpg",
  "imagens/questions/2.jpg",
  "imagens/questions/3.jpg",
  "imagens/questions/4.jpg",
  "imagens/questions/5.jpg",
  "imagens/questions/6.jpg",
  "imagens/questions/7.jpg",
  "imagens/questions/8.jpg",
  "imagens/questions/9.jpg",
  "imagens/questions/10.jpg"
]

let questions_phrase = [
  "Qual é o nome do protagonista da série Mr. Robot",
  "Qual é o objetivo principal do grupo de hackers liderado por Elliot",
  "Qual é o nome da empresa de segurança cibernética onde Elliot trabalha",
  "Quem é o líder da fsociety",
  "Qual é o distúrbio mental com o qual Elliot lida ao longo da série",
  "Qual o nome do peixe do Elliot",
  "Qual é o nome do misterioso líder da Dark Army",
  "Qual é o nome do episódio final da série Mr. Robot",
  "Qual é a profissão de Angela Moss na série",
  "Qual é o nome do bar onde Elliot e seus amigos costumam se encontrar"
]

let questions_answers = [
  ['Elliot Alderson', 'Edward Norton', 'Robert Esmail', 'Tyrell Wellick ', 'Phillip Price'],
  ['Apagar todos os registros financeiros globais ', 'Derrubar o governo dos Estados Unidos ', 'Encontrar e expor agentes secretos ', ' Hackear grandes corporações para redistribuir riqueza', 'Obter resultados de jogos de azar '],
  ['Allsafe ', 'Evil Corp', 'fsociety', 'Dark Army', 'Glass Shield'],
  ['Tyrell Wellick ', 'Angela Moss ', 'Mr. Robot', 'Phillip Price', 'Fernando Vera'],
  ['Transtorno Bipolar', 'Transtorno Dissociativo de Identidade', 'Transtorno de Personalidade Antissocial', 'Transtorno de Ansiedade Generalizada', 'Estresse pós-traumático'],
  ['Candy', 'Rops', 'Toy', 'Qwert', 'Lily'],
  ['Whiterose', 'Tyrell Wellick', 'Leon', 'Irving', 'Gideon Godard'],
  ['"Shutdown -r"', '"Hello, Elliot"', '"eps3.0_power-saver-mode.h"', '"404 Not Found"', '"Epsilon _"'],
  ['Advogada', 'Psicóloga', 'Engenheira de Software', 'Contadora', ' Manager'],
  ['Steel Mountain', 'Fun Society', 'The Arcade', 'The Red Wheelbarrow', 'Gestora']
]

let correct_answers = [0, 3, 0, 2, 1, 3, 0, 1, 3, 2]

let result = [
  ["Error406_NotAcettable", "imagens/results/1.jpg"],
  ["Vítima da Manipulação", "imagens/results/2.jpg"],
  ["Conexão Perdida", "imagens/results/3.jpg"],
  ["Mandou Mal", "imagens/results/4.jpg"],
  ["Iniciante Curioso", "imagens/results/5.jpg"],
  ["Fã Devoto", "imagens/results/6.jpg"],
  ["Hacker Ético", "imagens/results/7.jpg"],
  ["Arquiteto da Mudança", "imagens/results/8.jpg"],
  ["MASTERMIND_dec0d3d.doc", "imagens/results/9.jpg"],
  ["eps3.2_HACKER.MAN", "imagens/results/10.jpg"]
]

function respond(answer) {

  if (answered == 9) {
    document.getElementById("next-button").innerText = "Finalizar"
  }

  markAsAnswered();
  markAnswer(answer);
  markQuestionAsAnswered();
  enableNextButton();

  answered++;
  answering++;
  isTheRightAnswer = false;
}

function getAnswers() {
  return document.querySelectorAll("#answer");
}

function getQuestionsHistory() {
  return document.querySelectorAll("#question_history");
}

function markAsAnswered() {
  let answers = getAnswers();

  for (let i = 0; i < AMOUNT_OF_ANSWERS; i++) {
    answers[i].setAttribute("disabled", "")
    answers[i].classList.add("unanswered");
  }
}

function markAnswer(answer) {
  let answers = getAnswers();

  answers[answer].classList.remove("unanswered");
  if (answer == correct_answers[answering]) {
    answers[answer].classList.add("correct-answer");
    isTheRightAnswer = true;
    points++;
  } else {
    answers[answer].classList.add("wrong-answer");
  }
}

function markQuestionAsAnswered() {
  let question_history = getQuestionsHistory();

  question_history[answering].classList.remove("answering");
  if (isTheRightAnswer) {
    question_history[answering].classList.add("correct-answer");
  } else {
    question_history[answering].classList.add("wrong-answer");
  }
}

function enableNextButton() {
  document.getElementById("next").classList.remove("none");
}

function disableNextButton() {
  document.getElementById("next").classList.add("none");
}

function nextQuestion() {

  if (answered == 10) {
    document.getElementById("result-background").classList.remove("none");
    document.getElementById("question-answer-background").classList.add("none");
    document.getElementById("result").innerText = "Você acertou " + (points - 1) + " de 10"
    document.getElementById("next").classList.add("none");
    document.getElementById("question_phrase").innerText = result[points - 1][0];
    document.getElementById("image").style = "background-image: url(" + result[points - 1][1] + ")";
  } else {
    getQuestionsHistory()[answering].classList.remove("unanswered");
    getQuestionsHistory()[answering].classList.add("answering");
    disableNextButton();
    newQuestion();
  }
}

function newQuestion() {
  document.getElementById("image").style = "background-image: url(" + questions_image[answering] + ")";
  document.getElementById("question_phrase").innerText = questions_phrase[answering];
  cleanAnsweresButtons();
  setNewAnswers();
}

function cleanAnsweresButtons() {
  let answers = getAnswers();

  for (let i = 0; i < AMOUNT_OF_ANSWERS; i++) {
    answers[i].removeAttribute("disabled")
    answers[i].classList.remove("unanswered");
    answers[i].classList.remove("correct-answer");
    answers[i].classList.remove("wrong-answer");
  }
}

function setNewAnswers() {
  let answers = getAnswers();
  for (let i = 0; i < AMOUNT_OF_ANSWERS; i++) {
    answers[i].innerText = questions_answers[answering][i];
  }
}