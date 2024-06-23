
function Question (questionText, questionNo) {

  this.questionText = questionText;
  this.questionNo = questionNo;
}

function Answer (answerText){

  this.answerText = answerText;
}

function QuestionAnswerOptions(
  questionObj, answerOptionsObj, correctAnswerObj){

  this.questionObj = questionObj;
  this.answerOptionsObj = answerOptionsObj;
  this.correctAnswerObj = correctAnswerObj;

  this.correctAnswer = function(userSuppliedAnswer){

    if (this.correctAnswerObj.answerText == userSuppliedAnswer){

      console.log("Correct Answer");
      return true;
    }else{

      console.log("Incorrect Answer")
      return false;
    }
  }

}

// Question-Answer [1]

const question1 = new Question("Javascript supports", 1);

const answer1Q1 = new Answer("Functions");
const answer2Q1 = new Answer("XHTML");
const answer3Q1 = new Answer("CSS");
const answer4Q1 = new Answer("HTML");

const qA1 = new QuestionAnswerOptions(
  question1, 
  [answer1Q1, answer2Q1, answer3Q1, answer4Q1],
  answer1Q1
)

// Question-Answer [2]

const question2 
  = new Question("Which language can be used for styling web pages ?", 2);

const answer1Q2 = new Answer("HTML");
const answer2Q2 = new Answer("JQuery");
const answer3Q2 = new Answer("CSS");
const answer4Q2 = new Answer("XML");


const qA2 = new QuestionAnswerOptions(
  question2, 
  [answer1Q2, answer2Q2, answer3Q2, answer4Q2],
  answer3Q2
)


// Question-Answer [3]

const question3
  = new Question("Which is not a Javascript Framework", 3);

const answer1Q3 = new Answer("Python Script");
const answer2Q3 = new Answer("JQuery");
const answer3Q3 = new Answer("Django");
const answer4Q3 = new Answer("Node JS");


const qA3 = new QuestionAnswerOptions(
  question3, 
  [answer1Q3, answer2Q3, answer3Q3, answer4Q3],
  answer1Q3
)

// Question-Answer [4]

const question4
  = new Question("Which is used to connect to Database?", 4);

const answer1Q4 = new Answer("PHP");
const answer2Q4 = new Answer("HTML");
const answer3Q4 = new Answer("JS");
const answer4Q4 = new Answer("All");


const qA4 = new QuestionAnswerOptions(
  question4, 
  [answer1Q4, answer2Q4, answer3Q4, answer4Q4],
  answer1Q4
)


// Question-Answer [5]

const question5
  = new Question("Javascript is a ?", 5);

const answer1Q5 = new Answer("Language");
const answer2Q5 = new Answer("Programming Language");
const answer3Q5 = new Answer("Development");
const answer4Q5 = new Answer("All");


const qA5 = new QuestionAnswerOptions(
  question5, 
  [answer1Q5, answer2Q5, answer3Q5, answer4Q5],
  answer2Q5
)

function QuizApp(questionAnswerOptionsArrayObj){

  this.questionAnswerOptionsArrayObj = questionAnswerOptionsArrayObj;
  this.pageIndex = 0;
  this.score = 0;

  this.getScore = function() {
    return this.score;
  }

  this.incrementScore = function(){
    this.score ++;
  }

  this.calculatePercentage = function(){

    // (3 /  5) * 100

    const percentagValue  = (this.getScore() 
      / this.questionAnswerOptionsArrayObj.length) * 100;
    return percentagValue;
  }

  this.addListenersForAnswerButtons = function(){

    // quizApp
    const currentQuizAppObj = this;

    for (let index = 0; index < 4; index ++){

      // btn0, btn1, btn2, btn3

      let buttonID = ("btn" + index)
      const answerButtonElement = document.getElementById(buttonID);

      answerButtonElement.onclick = function(event){

        console.log("Button is clicked...")

        const answerButtonElementTarget = event.currentTarget
        const spanElement = answerButtonElementTarget.children[0]
        const userSuppliedAnswer = spanElement.innerHTML

        console.log(`User Supplied Answer -> ${userSuppliedAnswer}`)

        const qAnswerOptionsObj = currentQuizAppObj.questionAnswerOptionsArrayObj[
            currentQuizAppObj.pageIndex];
        
        const result 
          = qAnswerOptionsObj.correctAnswer(userSuppliedAnswer);
        console.log(`Result is ${result}`);
        
        if (result){
          currentQuizAppObj.incrementScore(); 
        }

        console.log(`Score is ${currentQuizAppObj.getScore()}`)

        // Load the next-question page / Load the result page

        //  4 == (5 - 1)
        if (currentQuizAppObj.pageIndex == (currentQuizAppObj.questionAnswerOptionsArrayObj.length - 1)){

          currentQuizAppObj.drawResultPage();
        }else{

          currentQuizAppObj.pageIndex ++;
          currentQuizAppObj.addListenersForAnswerButtons();
          currentQuizAppObj.drawQuizPage()
        }

      }
    }
  }

  this.drawResultPage = function(){

    let finalScoreHtmlFragment =
      `<h1>Result</h1>
        <h2 id='score'>Your scores: ${this.getScore()}. Percentage is ${this.calculatePercentage()}</h2>         
      `
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = finalScoreHtmlFragment;

  }

  this.init = function(){

    this.addListenersForAnswerButtons();
    this.drawQuizPage();
  }

  this.drawQuizPage = function(){

    this.drawHeader();
    this.drawContentAreaForQA();
    this.drawFooter();

  }

  this.drawHeader = function(){
    // No Impl Right now
  }

  this.drawContentAreaForQA = function(){

    const qAObj = this.questionAnswerOptionsArrayObj[this.pageIndex];

    // For Question
    const questionObj = qAObj.questionObj
    const questionHtmlElement = document.getElementById("question")
    questionHtmlElement.innerHTML = questionObj.questionText;

    // For Answer Options
    const answerOptionsObj = qAObj.answerOptionsObj
    for (let index = 0; index < 4; index ++){

      const answerOptionObj = answerOptionsObj[index];

      const spanID = ("choice" + index)
      const answerOptionHtmlElement = document.getElementById(spanID);

      answerOptionHtmlElement.innerHTML = answerOptionObj.answerText
    }
  }

  this.drawFooter = function(){

    const progressElement = document.getElementById("progress");

    const totalNoOfQuestions = this.questionAnswerOptionsArrayObj.length;

    progressElement.innerHTML = `Question ${this.pageIndex + 1} of ${totalNoOfQuestions}`;

  }
}

const quizApp = new QuizApp(
  [qA1, qA2, qA3, qA4, qA5]
)

quizApp.init()