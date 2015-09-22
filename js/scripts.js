//CHOICE, QUESTION & QUIZ OBJECT CONSTRUCTORS
// function Choice(choice) {
//   this.choice = choice;
//   //this.value = value;
// };

function Question(question, choices, answer) {
  this.question = question;
  this.choices = choices;
  this.answer = answer;
};

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
};

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.currentQuestionIndex = 0;
};

Quiz.prototype.guess = function(answer) {
  if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.currentQuestionIndex++;
}

Quiz.prototype.getCurrentQuestion = function() {
  return this.questions[this.currentQuestionIndex];
};

// Quiz.prototype.selection = function() {
//   this.score += this.Question.Choice.value;
//   debugger;
//   //take value and add to quiz score
//   this.currentQuestionIndex++;
// }

Quiz.prototype.hasEnded = function() {
  return this.currentQuestionIndex >= this.questions.length;
};

//CREATE QUESTIONS AND CHOICES
// var question1choices = [
//   new Choice("I like bownanas"),
//   new Choice("My favorite book character wears a bow!"),
//   new Choice("Only when they are covered in blood!"),
//   new Choice("They're purrrrrfect.")
// ];

var questions = [
  new Question("Do you like bows?", ["I like bownanas", "My favorite book character wears a bow!", "Only when they are covered in blood!", "They're purrrrrfect."], "They're purrrrrfect."),
  new Question("Do you like taking over the world?", ["I'd rather read a book", "Once I'm finished feasting on mankind", "I'm more into taking over bridges", "Vote for me and we can take over the world together!"], "Vote for me and we can take over the world together!")
]

var quiz = new Quiz(questions);



//FEED INFO TO UI
var QuizUI = {
  displayNext: function() {
    if(quiz.hasEnded()) {
      this.displayScore();
    } else {
      this.displayQuestion();
      this.displayChoices();
      this.displayProgress();
    }
  },

  displayQuestion: function() {
    this.populateIdWithHTML("question", quiz.getCurrentQuestion().question);
  },

  displayChoices: function() {
    var choices = quiz.getCurrentQuestion().choices;

    for(var i = 0; i < choices.length; i++) {
      this.populateIdWithHTML("choice" + i, choices[i]);
      this.guessHandler("guess" + i, choices[i]);
    }
  },

  displayScore: function() {
    var gameOverHTML = "<h1>Quiz Finished</h1>";
    gameOverHTML += "<h2>" + quiz.score + "</h2>";
    this.populateIdWithHTML("quiz", gameOverHTML);
  },

  populateIdWithHTML: function(id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },

  guessHandler: function(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
      quiz.guess(guess);
      QuizUI.displayNext();
    }
  },

  displayProgress: function() {
    var currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
  }
}


$(document).ready(function() {

    QuizUI.displayNext();


});
