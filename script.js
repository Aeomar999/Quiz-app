const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const progressBar = document.getElementById('progress-bar');
const scoreSpan = document.getElementById('score');
const maxScoreSpan = document.getElementById('max-score');
const finalScoreSpan = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');


const quizQuestions = [
    { question: "Which HTML tag is used to link an external JavaScript file to a web page?",
      answers: [
        { text: "<link>", correct: false },
        { text: "<script>", correct: true },
        { text: "<js>", correct: false },
        { text: "<javascript>", correct: false },
      ],  
    },
    { question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style System", correct: false },
        { text: "Colorful Style Sheets", correct: false },
      ],  
    },
    { question: "Which property is used to change the background color in CSS?",
      answers: [
        { text: "bgcolor", correct: false },
        { text: "background-color", correct: true },
        { text: "color", correct: false },
        { text: "background", correct: false },
        ],
    },
    { question: "Which HTTP status code indicates that a requested page was not found?",
      answers: [
        { text: "200", correct: false },
        { text: "301", correct: false },
        { text: "404", correct: true },
        { text: "500", correct: false },
      ],  
    },
    { question: "What is the primary purpose of the alt attribute in an <img> tag?",
      answers: [
        { text: "To provide a tooltip when hovering over the image", correct: false },
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