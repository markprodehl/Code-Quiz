var startContainer = document.getElementById('startContainer')
var gameContainer = document.getElementById('gameContainer')
var scoresContainer = document.getElementById('scoresContainer')

var questionEl = document.getElementById('question')
var answersEl = document.getElementById('answerChoices')

var btnStart = document.getElementById('btnStart')
var btnHighScores = document.getElementById('navHighscores')
var btnHome = document.getElementById('homeBtn')
var navTimer = document.getElementById("navTimer"); //new

var scoreCounter = localStorage.getItem("scoreCounter");

var qIndex = 0;

btnStart.addEventListener("click", displayGame)
btnHighScores.addEventListener("click", displayHighScores)
btnHome.addEventListener("click", displayHome)

//starts the quiz by clicking the start quiz button
btnStart.addEventListener("click", displayQuestion);
btnStart.addEventListener("click", startTimer); //

//TIMER///
var secondsLeft = 60 //

var timerInterval

function startTimer() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        navTimer.textContent = secondsLeft + " Seconds Remaining!";

        // if there are 0 seconds 
        if (secondsLeft <= 0) {
            //stop the timer
            clearInterval(timerInterval);
            secondsLeft = 60
            displayHighScores()

            navTimer.textContent = "Your time is UP!";
        }
    }, 1000);

}

function displayQuestion() {

    answersEl.innerHTML = ""

    var currentQuestion = questions[qIndex]

    var question = currentQuestion.question
    var choices = currentQuestion.choices

    questionEl.textContent = question

    for (var i = 0; i < choices.length; i++) {

        var button = document.createElement("button")
        button.textContent = choices[i]
        button.addEventListener("click", clickChoice)

        answersEl.appendChild(button);
    }
}
var answerCorrect = 0
    //ternary operation -- if highscore is exists i.e true in local storage, then use that score. If not then use answercorrect
var highScore = localStorage.getItem("highScore") ? localStorage.getItem("highScore") : answerCorrect

function clickChoice() {
    var currentQuestion = questions[qIndex]
    var answer = currentQuestion.answer
    console.log(currentQuestion)

    if (answer === this.textContent) {
        console.log("CORRECT")
        answerCorrect++
        console.log(answerCorrect);

    } else {
        console.log("INCORRECT")
    }

    qIndex++;

    if (qIndex < questions.length) {
        displayQuestion();
    } else {
        clearInterval(timerInterval)
        console.log("timerInterval", timerInterval)

        localStorage.setItem("score", parseInt(answerCorrect))
            // Check if answerCorrect is higher than highScore
        if (answerCorrect > highScore) {
            // Set highScore to answerCorrect in localStorage
            localStorage.setItem("highScore", parseInt(answerCorrect))
                // Set the highScore variable to answerCorrect
            highScore = answerCorrect
                // Display the high score
            displayHighScores()

        } else {
            // If answerCorrect isn't higher than highScore, display the latest highScore
            displayHighScores()
        }
    }
}

function displayHome() {
    startContainer.classList.remove('hide')
    gameContainer.classList.add('hide')
    scoresContainer.classList.add('hide')
    qIndex = 0
    answerCorrect = 0
    secondsLeft = 60
}

function displayGame() {
    startContainer.classList.add('hide')
    gameContainer.classList.remove('hide')
    scoresContainer.classList.add('hide')
}

function displayHighScores() {
    startContainer.classList.add('hide')
    gameContainer.classList.add('hide')
    scoresContainer.classList.remove('hide')
    document.querySelector("#scoresContainer").textContent = "Your highest score so far is " + highScore + " out of 5"
    navTimer.textContent = "Your time is UP!"
}