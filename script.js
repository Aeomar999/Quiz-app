const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress-bar");
const scoreSpan = document.getElementById("score");
const maxScoreSpan = document.getElementById("max-score");
const finalScoreSpan = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");

const quizQuestions = [
  {
    question:
      "Which HTML tag is used to link an external JavaScript file to a web page?",
    answers: [
      { text: "<link>", correct: false },
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style System", correct: false },
      { text: "Colorful Style Sheets", correct: false },
    ],
  },
  {
    question: "Which property is used to change the background color in CSS?",
    answers: [
      { text: "bgcolor", correct: false },
      { text: "background-color", correct: true },
      { text: "color", correct: false },
      { text: "background", correct: false },
    ],
  },
  {
    question:
      "Which HTTP status code indicates that a requested page was not found?",
    answers: [
      { text: "200", correct: false },
      { text: "301", correct: false },
      { text: "404", correct: true },
      { text: "500", correct: false },
    ],
  },
  {
    question:
      "What is the primary purpose of the alt attribute in an <img> tag?",
    answers: [
      {
        text: "To provide a tooltip when hovering over the image",
        correct: false,
      },
      { text: "To specify the image's alignment on the page", correct: false },
      { text: "To provide alternative text for screen readers", correct: true },
      { text: "To define the image's dimensions", correct: false },
    ],
  },
];

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let answersLocked = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Quiz event listeners
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  //reset vars
  currentQuestionIndex = 0;
  // score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  //reset state
  answersLocked = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;

  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersLocked) return;

  answersLocked = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion()
    } else {
      showResults()
    }
  }, 1000);
}

function showResults(){
  quizScreen.classList.remove("active")
  resultScreen.classList.add("active")

  finalScoreSpan.textContent = score;

  const percentage = (score/quizQuestions.length) * 100

  
}

function restartQuiz() {
  console.log("Quiz restarted");
}
