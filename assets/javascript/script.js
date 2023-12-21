let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextButton = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount = 0;
let scoreCount = 0;
let count = 11;
let countdown;
let submitBtn = document.querySelector("#submit");
// Adding the save score
const saveScoreForm = document.getElementById("save-score-form");

// List of questions and answers
const quizArray = [
  {
    id: "0",
    question: "Saint John is located in the provice of ____________.",
    options: [
      "Newfoundland and Labrador",
      "New Brunswick",
      "Nova Scotia",
      "British Columbia",
    ],
    correct: "New Brunswick",
  },
  {
    id: "1",
    question: "What is the alternate name of the Saint John River?",
    options: ["Wolastoq", "French river", "Fundy river", "Long river"],
    correct: "Wolastoq",
  },

  {
    id: "2",
    question: "Saint John's economy has been largely derived from  ___________",
    options: ["Maritime industry", "Technology", "Manufacturing", "Tourism"],
    correct: "Maritime industry",
  },

  {
    id: "3",
    question: "What can you find in the Saint John's City Market?",
    options: [
      "Local produce",
      "Fresh seafood",
      "old-fashioned butchers",
      "All of the options",
    ],
    correct: "All of the options",
  },
];

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

nextButton.addEventListener(
  "click",
  (displayNext = () => {
    questionCount += 1;
    if (questionCount == quizArray.length) {
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      userScore.innerHTML =
        "Your final score is " + scoreCount + " out of " + questionCount;
    } else {
      countOfQuestion.innerHTML =
        questionCount + " of " + quizArray.length + " question";
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    console.log(count);
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(count);
      displayNext();
    }
  }, 1000);
};

const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");

  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  quizCards[questionCount].classList.remove("hide");
};
function quizCreator() {
  quizArray.sort(() => Math.random() - 0.5);
  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);

    div.innerHTML += `
        <button class="option-div" onclick="checker(this)">
        ${i.options[0]}</button>
           <button class="option-div" onclick="checker(this)">
        ${i.options[1]}</button>
          <button class="option-div" onclick="checker(this)">
        ${i.options[2]}</button>
          <button class="option-div" onclick="checker(this)">
        ${i.options[3]}</button>
        `;
    quizContainer.appendChild(div);
  }
}

function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  if (userSolution === quizArray[questionCount].correct) {
    console.log(userSolution);
    userOption.classList.add("correct");
    scoreCount++;
    console.log(scoreCount);
  } else {
    userOption.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText != quizArray[questionCount].correct) {
        element.classList.add("incorrect");
        countdown = countdown - 5;
      }
    });
  }
  clearInterval(countdown);
  options.forEach((element) => {
    element.disabled = true;
  });
}

function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};

function saveHighScore() {
  const initials = document.getElementById("initials").value.trim();
  if (initials !== "") {
    // Get existing scores from local storage
    const existingScores = JSON.parse(localStorage.getItem("highScores")) || [];
    // Add the new score
    existingScores.push({ initials, score: scoreCount });
    // Sort scores in descending order
    existingScores.sort((a, b) => b.score - a.score);
    // Store the scores back in local storage
    localStorage.setItem("highScores", JSON.stringify(existingScores));
    // Optionally, reset the game for a new quiz

    console.log(highScores);
  } else {
    alert("Please enter your initials.");
  }
}

submitBtn.onclick = saveHighScore;

// display highscore
const highScoresButton = document.getElementById("high-score");
const highScoresList = document.getElementById("high-scores-list");

highScoresButton.addEventListener("click", showHighScores);

function showHighScores() {
  highScoresButton.style.display = "none";
  quizContainer.style.display = "none";

  displayHighScoresList();
}

function displayHighScoresList() {
  // Get existing scores from local storage
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Clear existing list
  highScoresList.innerHTML = "";

  // Display each high score in the list
  highScores.forEach((entry) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${entry.initials}: ${entry.score}`;
    highScoresList.appendChild(listItem);
  });
}
