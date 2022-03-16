// FUNCTIONS - LOCAL 
// Once the user inputs their name, display their name and their score
function myScore() { 
    submitNameButton.style.display = 'none'; 
    goBackButton.style.display = 'inline-block';
    clearScoreButton.style.display = 'inline-block'; 
    var myQuizScore = localStorage.getItem("myQuizScore");
    var numQuestions = localStorage.getItem("numQuestions");
    var x = document.getElementById("tt").value;
    document.getElementById("my-score").textContent = x + ", your final score is: " + myQuizScore + " out of " + numQuestions;
    inputText.style.display = 'none';
}

// when "Clear High Score" button is clicked, clear the high score saved in the local storage 
function clearHighScore() {
    document.getElementById("my-score").textContent = " ";
    resultsElement.textContent = " ";
}

// to build the quiz that is displayed to the user 
function buildQuiz(){

    // to store the output for the page 
    const output = [];
    output.push(
        `<div class="slide"> 
        <div class="start-page"> </div>
        </div>`
    )

    // for each question in the quizQuestions array, do the following:
    quizQuestions.forEach((currentQuestion, questionNumber) => {
        // variable to store the list of given answer options for each question 
        const answers = [];
        // for each answer option, do the following: 
        for(letter in currentQuestion.answers){
            // add radio buttons to the quiz answer options 
            answers.push(
            `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
            </label>`
            );
        }
        // add this question and its answers to the output which is displayed on the screen 
        output.push(
            `<div class="slide"> 
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
            </div>`
        );
        }
    );
    
    // finally combine our output list into one string and output it on the page
    quizElement.innerHTML = output.join('');
}

// creating a tempCount to access the last if statement in the function - to clear the question once the user clicks 
// submit. Then the user is present which only an input field asking for their name. 
var tempCount = 0; 
function showResults(){

    const quizElement = document.getElementById('quiz');
    // get the answer container from our quiz array 
    const answerContainers = quizElement.querySelectorAll('.answers');
    // keep track of user's answers
    var numCorrect = 0;
    // for each question in the quizQuestions array, do the following: 
    quizQuestions.forEach((currentQuestion, questionNumber) => {
        resultsElement.innerHTML = ' '; 
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
            // increase the count for the number of correct answers 
            numCorrect++;  
        }
        // if answer is wrong or blank (does not fully work :( )
        else if (userAnswer !== currentQuestion.correctAnswer) {
            //console.log("hmmmm"); 
            //localStorage.setItem("incorrectCount", 0);   
        }
    });

    // store the user's score and the number of questions in local storafe
    localStorage.setItem("myQuizScore", numCorrect); 
    localStorage.setItem("numQuestions", quizQuestions.length); 
    resultsElement.textContent = "Score: " + numCorrect + " out of " + quizQuestions.length; 

    // if the user is on the last question page, refresh the page to allow the user to add their name 
    // and see their score
    if (questionNumber === quizQuestions.length-1){
        tempCount++; 
        if (tempCount === 2){
            newPage(); 

        } 
    }  
}

// start the time once the user clicks "start" amd wants to start the quiz 
function startTimer(){ 
    var timeleft = 50; 

    var quizTimer = setInterval(function function1(){
    document.getElementById("countdown").textContent = timeleft + " " + "seconds remaining";
    var incorrectCheck = localStorage.getItem("incorrectCount"); 

    // Time subtraction does not fully work :( 
    var tempCount2 = 1;
    console.log(incorrectCheck); 
    if (incorrectCheck === '0'){
        timeleft -= 1;
        tempCount2 = 0; 
    }
    else { 
        timeleft -= 1;
    }
    
    if(timeleft <= 0){
        clearInterval(quizTimer);
        document.getElementById("countdown").textContent = "Time is up!"
        newPage();
    }
    }, 1000);

    document.getElementById('submit').addEventListener("click", function() {
        clearInterval(quizTimer);
        document.getElementById("countdown").textContent = "Thank you for submitting the quiz!"
    } ); 

    console.log(countdown);
    // once the start button is clicked and timer is started, make the user go to the first page 
    // of the quiz
    showNextPage(); 
}

// When the user clicks on submit for the quiz, a new page appears asking for their name to be 
// inputted
function newPage() { 
    resultsElement.textContent = " ";
    inputText.style.display = 'inline-block';
    submitNameButton.style.display = 'inline-block'; 
    quizElement.innerHTML = " "; 
    submitButton.style.display = 'none';
    previousButton.style.display = 'none';
    nextButton.style.display = 'none'
}

// show whichever slide/page the user is on based on the button they click (next or previous) and 
// the page they are on 
function showSlide(n) {
    questionNumber = n-1; 
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    // first slide 
    if(currentSlide === 0){
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
        submitButton.style.display = 'inline-block';
    }
    //otherwise 
    else{
        startButton.style.display = 'none'; 
        previousButton.style.display = 'inline-block';
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
        resultsElement.style.display = 'inline-block'; 
    }

    // show results at every page to show the user whether they got the question right 
    // or wrong (except for the final question)
    showResults(); 
}

// start the quiz - page = 0 
function startQuiz() {
    var currentSlide = 0; 
    showSlide(currentSlide); 
}

// show next page when the next button is clicked 
function showNextPage() {
    showSlide(currentSlide + 1);
}

// show previous page when the previous button is clicked 
function showPreviousPage() {
    showSlide(currentSlide - 1);
}

// GLOBAL 
// array of quiz questions, answer options and the correct answer 
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

// pagination - moving from one page to the other using the provided buttons 
const startButton = document.getElementById("start")
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
var currentSlide = 0;

// start the quiz
startQuiz(); 

// event listeners for the buttons on the page 
startButton.addEventListener('click', startTimer); 
previousButton.addEventListener("click", showPreviousPage);
nextButton.addEventListener("click", showNextPage);
submitButton.addEventListener('click', showResults);



