
function startTimer(){ 
    var checkIncorrectCount = localStorage.getItem("checkIncorrect"); 
    var timeleft = 50; 

    var downloadTimer = setInterval(function function1(){
    document.getElementById("countdown").textContent = timeleft + " " + "seconds remaining";

    console.log(checkIncorrectCount); 
    if (checkIncorrectCount > 1){
        console.log("what"); 
        timeleft -= 15;
        checkIncorrectCount = 0; 
    }
    else { 
        timeleft -= 1;
    }
    
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
    submitNameButton.style.display = 'none'; 
    goBackButton.style.display = 'inline-block';
    clearScoreButton.style.display = 'inline-block'; 
    var myQuizScore = localStorage.getItem("myQuizScore");
    var numQuestions = localStorage.getItem("numQuestions");
    var x = document.getElementById("tt").value;
    document.getElementById("demo").textContent = x + ", your final score is: " + myQuizScore + " out of " + numQuestions;
    inputText.style.display = 'none';
}

function clearHighScore() {
    document.getElementById("demo").textContent = " ";
    resultsElement.textContent = " ";
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
 
var tempCount = 0; 
function showResults(){

    const quizElement = document.getElementById('quiz');
    // gather answer containers from our quiz
    const answerContainers = quizElement.querySelectorAll('.answers');

    // keep track of user's answers
    var numCorrect = 0;
    var numIncorrect = 0; 

    // for each question...
    quizQuestions.forEach((currentQuestion, questionNumber) => {

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
        else if (userAnswer !== currentQuestion.correctAnswer) {
            numIncorrect++; 
            //console.log(incorrectCount); 
            //localStorage.setItem("checkIncorrect", incorrectCount);
        }
        //resultsElement.textContent = `Score: ${numCorrect} out of ${quizQuestions.length}`;
    });

    localStorage.setItem("myQuizScore", numCorrect); 
    localStorage.setItem("numQuestions", quizQuestions.length); 
    resultsElement.textContent = "Score: " + numCorrect + " out of " + quizQuestions.length; 

    if (questionNumber === quizQuestions.length-1){
        tempCount++; 
        if (tempCount === 2){
            resultsElement.textContent = " "; 
            newPage(); 

        } 
    }  
}

function newPage() { 
    inputText.style.display = 'inline-block';
    submitNameButton.style.display = 'inline-block'; 
    //goBackButton.style.display = 'inline-block';
    //clearScoreButton.style.display = 'inline-block'; 
    quizElement.innerHTML = " "; 
    submitButton.style.display = 'none';
    previousButton.style.display = 'none';
    //resultsElement.textContent = "Score: " + myQuizScore + " / " + numQuestions; 
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
        inputText.style.display = 'none'; 
        resultsElement.style.display = 'none'; 
    }
    //last slide 
    else if(currentSlide === slides.length-1){
        startButton.style.display = 'none'; 
        nextButton.style.display = 'none';
        //submitNameButton.style.display = 'inline-block'
        submitButton.style.display = 'inline-block';
        //goBackButton.style.display = 'inline-block';
        //clearScoreButton.style.display = 'inline-block'; 
        //inputText.style.display = 'inline-block';
    }
    //otherwise 
    else{
        startButton.style.display = 'none'; 
        previousButton.style.display = 'inline-block';
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
        resultsElement.style.display = 'inline-block'; 
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

function clear() {
    resultsElement.innerHTML = " "; 
    quizElement.innerHTML = " ";
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
const inputText = document.getElementById('tt'); 
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



