var startContainer = document.getElementById('startContainer')
var gameContainer = document.getElementById('gameContainer')
var scoresContainer = document.getElementById('scoresContainer')

var questionEl = document.getElementById('question')
var answersEl = document.getElementById('answerChoices')

var btnStart = document.getElementById('btnStart')
var btnHighScores = document.getElementById('navHighscores')
var btnHome = document.getElementById('homeBtn')

var navTimer = document.getElementById("navTimer"); //new

var qIndex = 0;


btnStart.addEventListener("click", displayGame)
btnHighScores.addEventListener("click", displayHighScores)
btnHome.addEventListener("click", displayHome)

//starts the quiz by clicking the start quiz button
btnStart.addEventListener("click", displayQuestion);
btnStart.addEventListener("click", startTimer); //

displayQuestion();

//TIMER///
var secondsLeft = 5 //

var timerInterval

function startTimer() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        navTimer.textContent = secondsLeft + " Seconds Remaining!";

        // if there are 0 seconds 
        if (secondsLeft === 0) {
            //stop the timer
            clearInterval(timerInterval);
            // add an end here
            navTimer.textContent = "Your time is UP!";
        }
        //funcion to display end screen
        // if statement
        // start or new page
    }, 1000);

}
//*********** */


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

        answersEl.appendChild(button)

    }
}


function clickChoice() {
    var currentQuestion = questions[qIndex]
    var answer = currentQuestion.answer

    if (answer === this.textContent) {
        console.log("CORRECT")

    } else {
        console.log("INCORRECT")
    }

    qIndex++;

    if (qIndex < questions.length) {
        displayQuestion();
    } else {
        displayHighScores()
    }
}

function displayHome() {
    startContainer.classList.remove('hide')
    gameContainer.classList.add('hide')
    scoresContainer.classList.add('hide')
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
}

// var questions = [{
//         question: "Which of the following is a Javascript primitive",
//         choices: ["Strings", "Arrays", "Numbers", "Booleans"],
//         answer: "Arrays"
//     },
//     {
//         question: "Two",
//         choices: ["One", "Two", "Three"],
//         answer: "Two"
//     },
//     {
//         question: "Three",
//         choices: ["One", "Two", "Three"],
//         answer: "Three"
//     },
// ]