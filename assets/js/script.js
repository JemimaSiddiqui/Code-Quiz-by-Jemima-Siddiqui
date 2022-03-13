function startTimer(){ 

    var timeleft = 15;
    
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

function my() { 
    var x = document.getElementById("tt").value;
    document.getElementById("demo").innerHTML = x;
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
            resultsElement.textContent = 'correct'; 
        }
        // if answer is wrong or blank
        else if (userAnswer !== currentQuestion.correctAnswer){
            resultsElement.textContent = 'incorrect'; 
        }
    });

    resultsElement.textContent = `${numCorrect} out of ${quizQuestions.length}`;

    my(); 
}

   
function showSlide(n) {
    questionNumber = n-1; 
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
        document.getElementById("next").disabled = true;
        nextButton.style.display = 'none'; 
        previousButton.style.display = 'none';
        
    }
    else{
        document.getElementById("next").disabled = false;
        previousButton.style.display = 'inline-block';
        startButton.style.display ='none'
    }
    if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
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
        question: "Who invented JavaScript?",
        answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
        },
        correctAnswer: "c",
        questionNum: 1
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
        },
        correctAnswer: "c",
        questionNum: 2
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
        },
        correctAnswer: "d",
        questionNum: 3
    }
];

// getting HTML elements by their ID 
const quizElement = document.getElementById('quiz');
const resultsElement = document.getElementById('results');
const submitButton = document.getElementById('submit');

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

