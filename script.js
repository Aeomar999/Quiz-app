/*
  Element Selection - Getting references to DOM elements
  These constants store references to HTML elements for later manipulation
  Using getElementById is efficient for selecting elements by their unique ID
*/

// Screen elements - used to show/hide different parts of the quiz
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

// Button elements - used to attach event listeners
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

// Quiz content elements - updated dynamically during the quiz
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress");

// Score and progress elements - display user's performance
const scoreSpan = document.getElementById("score");
const maxScoreSpan = document.getElementById("max-score");
const finalScoreSpan = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");

/*
  Quiz Data Structure - Array of question objects
  Each question is an object containing:
    - question: String with the question text
    - answers: Array of answer objects with text and correct properties
  
  This data structure allows easy iteration and access to question properties
  Using an array makes it simple to track progress and add new questions
*/
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

/*
  Quiz State Variables - Track the current status of the quiz
  These variables maintain the state throughout the user's interaction:
    - currentQuestionIndex: Tracks which question is currently displayed
    - score: Counts the number of correct answers
    - answersLocked: Prevents multiple clicks on answers
*/
let currentQuestionIndex = 0;
let score = 0;
let answersLocked = false;

/*
  Initial Setup - Set static content that doesn't change during the quiz
  Setting these values once at the beginning avoids repeated DOM manipulation
*/
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

/*
  Event Listeners - Connect user interactions to JavaScript functions
  These establish the connection between user actions and application responses:
    - Clicking start button triggers startQuiz function
    - Clicking restart button triggers restartQuiz function
*/
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

/*
  startQuiz Function - Initializes a new quiz session
  This function resets the quiz state and transitions to the first question:
    1. Resets tracking variables to initial values
    2. Updates the score display
    3. Transitions from start screen to quiz screen
    4. Calls showQuestion to display the first question
*/
function startQuiz() {
  // Reset tracking variables to start a fresh quiz
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  // Screen transition - hide start screen and show quiz screen
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  // Display the first question
  showQuestion();
}

/*
  showQuestion Function - Displays the current question and its answers
  This function dynamically generates the UI for each question:
    1. Resets answer locking state
    2. Gets the current question from the quizQuestions array
    3. Updates progress indicators
    4. Clears previous answers
    5. Creates new answer buttons for current question
*/
function showQuestion() {
  // Reset answer locking for new question
  answersLocked = false;

  // Get current question object from array using index
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Update question counter display
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  // Calculate and update progress bar width
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  // Update question text
  questionText.textContent = currentQuestion.question;

  // Clear previous answer buttons
  answersContainer.innerHTML = "";

  /*
    Create answer buttons for current question
    Uses forEach to iterate through answers array:
      1. Creates a new button element for each answer
      2. Sets button text to answer text
      3. Adds CSS classes for styling
      4. Stores correctness in data attribute for later checking
      5. Attaches click event listener
      6. Appends button to container
  */
  currentQuestion.answers.forEach((answer) => {
    // Create new button element
    const button = document.createElement("button");

    // Set button text to answer text
    button.textContent = answer.text;

    // Add CSS class for styling
    button.classList.add("answer-btn");

    // Store correctness in data attribute (accessible via dataset)
    button.dataset.correct = answer.correct;

    // Attach click event listener to each button
    button.addEventListener("click", selectAnswer);

    // Add button to answers container
    answersContainer.appendChild(button);
  });
}

/*
  selectAnswer Function - Handles user's answer selection
  This function processes the user's choice and provides feedback:
    1. Prevents multiple selections using answersLocked
    2. Locks answers to prevent further interaction
    3. Identifies selected and correct answers
    4. Provides visual feedback for all answers
    5. Updates score if answer is correct
    6. Advances to next question or shows results
*/
function selectAnswer(event) {
  // Prevent processing if answers are locked
  if (answersLocked) return;

  // Lock answers to prevent multiple selections
  answersLocked = true;

  // Identify the clicked button and whether it's correct
  const selectedButton = event.target;
  // Convert string "true"/"false" to boolean
  const isCorrect = selectedButton.dataset.correct === "true";

  /*
    Provide visual feedback for all answer buttons
    Iterates through all answer buttons to:
      1. Highlight correct answer in green
      2. Highlight incorrect selection in red (if applicable)
      3. Leave other incorrect answers unmarked
  */
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      // Always highlight the correct answer
      button.classList.add("correct");
    } else if (button === selectedButton) {
      // Highlight incorrect selection in red
      button.classList.add("incorrect");
    }
  });

  // Update score if answer is correct
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  /*
    Advance to next question after delay
    Uses setTimeout to provide time for user to see feedback:
      1. Increments question index
      2. Checks if more questions remain
      3. Either shows next question or displays results
  */
  setTimeout(() => {
    // Move to next question
    currentQuestionIndex++;

    // Check if more questions remain
    if (currentQuestionIndex < quizQuestions.length) {
      // Show next question
      showQuestion();
    } else {
      // Show results screen
      showResults();
    }
  }, 1000); // 1 second delay
}

/*
  showResults Function - Displays final quiz results
  This function shows the user's final score and personalized message:
    1. Transitions from quiz screen to results screen
    2. Displays final score
    3. Calculates performance percentage
    4. Shows personalized message based on performance
*/
function showResults() {
  // Screen transition - hide quiz screen and show results screen
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  // Display final score
  finalScoreSpan.textContent = score;

  // Calculate performance percentage
  const percentage = (score / quizQuestions.length) * 100;

  /*
    Select personalized message based on performance
    Uses if/else chain to determine appropriate message:
      - Perfect score: Special recognition
      - High score: Positive reinforcement
      - Medium score: Encouragement to continue
      - Low score: Minimal positive feedback
      - Very low score: Constructive feedback
  */
  if (percentage === 100) {
    resultMessage.textContent = "You had a perfect score. You are a Genius 👨🏾‍🏫";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great Job. You know your stuff.";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort, keep learning.";
  } else if (percentage >= 50) {
    resultMessage.textContent = "You pass";
  } else {
    resultMessage.textContent = "You are a failure";
  }
}

/*
  restartQuiz Function - Allows user to take quiz again
  This function resets the quiz and starts over:
    1. Transitions from results screen to start screen
    2. Calls startQuiz to begin a new session
*/
function restartQuiz() {
  // Screen transition - hide results screen and show start screen
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");

  // Begin new quiz session
  startQuiz();
}
