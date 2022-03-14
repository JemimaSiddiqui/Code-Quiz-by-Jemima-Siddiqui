
function startTimer(){ 
    var time = 15; 
    localStorage.setItem("timeLeft", time); 
    
        var downloadTimer = setInterval(function function1(){
        document.getElementById("countdown").textContent = timeleft + " " + "seconds remaining";
    
        timeleft -= 1;
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            document.getElementById("countdown").textContent = "Time is up!"
        }
        }, 1000);

        document.getElementById('submit').addEventListener("click", function() {
            clearInterval(downloadTimer);
            document.getElementById("countdown").textContent = "Thank you for submitting the quiz!"
        } ); 
    
        console.log(countdown);
        showNextSlide(); 
}

function myScore() { 
    var myQuizScore = localStorage.getItem("myQuizScore");
    var numQuestions = localStorage.getItem("numQuestions");
    var x = document.getElementById("tt").value;
    document.getElementById("demo").textContent = x + ", your score is: " + myQuizScore + " out of " + numQuestions;
}

function clearHighScore() {
    document.getElementById("demo").textContent = " ";
}

// to build the quiz that is displayed to the user 
function buildQuiz(){
    // to store the HTML output
    const output = [];

    output.push(
        `<div class="slide"> 
        <div class="start-page"> </div>
        </div>`
    )
    // for each question...
    quizQuestions.forEach(
        (currentQuestion, questionNumber) => {
        // variable to store the list of possible answers
        const answers = [];
        // and for each available answer...
        for(letter in currentQuestion.answers){
            // ...add an HTML radio button
            answers.push(
            `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
            </label>`
            );
        }
        // add this question and its answers to the output
        output.push(
            `<div class="slide"> 
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
            </div>`
        );
        }
    );
    
    // finally combine our output list into one string of HTML and put it on the page
    quizElement.innerHTML = output.join('');
}
    
function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizElement.querySelectorAll('.answers');

    // keep track of user's answers
    var numCorrect = 0;

    // for each question...
    quizQuestions.forEach( (currentQuestion, questionNumber) => {

        resultsElement.innerHTML = ' ';
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
            // add to the number of correct answers
            numCorrect++;
            //resultsElement.textContent = 'correct'; 
        }
        // if answer is wrong or blank
        else if (userAnswer !== currentQuestion.correctAnswer){
            //resultsElement.textContent = 'incorrect'; 
            /*var timeLeft = localStorage.getItem("timeLeft"); 
            timeLeft = timeLeft - 2; 
            startTimer(timeLeft);*/ 
        }
    });


    localStorage.setItem("myQuizScore", numCorrect); 
    localStorage.setItem("numQuestions", quizQuestions.length); 
    resultsElement.textContent = `Score: ${numCorrect} out of ${quizQuestions.length}`;
}

   
function showSlide(n) {
    questionNumber = n-1; 
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    // first slide 
    if(currentSlide === 0){
        //document.getElementById("next").disabled = true;
        nextButton.style.display = 'none'; 
        previousButton.style.display = 'none';
        submitNameButton.style.display = 'none'; 
        submitButton.style.display = 'none'; 
        goBackButton.style.display = 'none'; 
        clearScoreButton.style.display = 'none'; 
    }
    //last slide 
    else if(currentSlide === slides.length-1){
        startButton.style.display = 'none'; 
        nextButton.style.display = 'none';
        submitNameButton.style.display = 'inline-block'
        submitButton.style.display = 'inline-block';
        goBackButton.style.display = 'inline-block';
        clearScoreButton.style.display = 'inline-block'; 
    }
    //otherwise 
    else{
        //document.getElementById("next").disabled = false;
        startButton.style.display = 'none'; 
        previousButton.style.display = 'inline-block';
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
        //startButton.style.display ='none'

    }
    showResults(); 
}

function startQuiz() {
    var currentSlide = 0; 
    showSlide(currentSlide); 
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

const quizQuestions = [
    {
        question: "Javascript is an _______ language?",
        answers: {
        a: "Object Oriented",
        b: "Procedural",
        c: "Object Based", 
        d: "None of the above"
        },
        correctAnswer: "a",
        questionNum: 1
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        answers: {
        a: "int",
        b: "var",
        c: "const",
        d: "char"
        },
        correctAnswer: "c",
        questionNum: 2
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        answers: {
        a: "getElementById()",
        b: "getElement()",
        c: "get()",
        d: "ESLint"
        },
        correctAnswer: "a",
        questionNum: 3
    }
];


// getting HTML elements by their ID 
const quizElement = document.getElementById('quiz');
const resultsElement = document.getElementById('results');
const submitButton = document.getElementById('submit');
const submitNameButton = document.getElementById('submit-name');
const goBackButton = document.getElementById('go-back');
const clearScoreButton = document.getElementById('clear-score');

// call the buildQuiz function to be displayed on the webpage 
buildQuiz();

// Pagination
const startButton = document.getElementById("start")
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
var currentSlide = 0;

// start the quiz
startQuiz(); 

// Event listeners
startButton.addEventListener('click', startTimer); 
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
submitButton.addEventListener('click', showResults);

