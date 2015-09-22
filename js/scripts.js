//QUESTION & QUIZ OBJECT CONSTRUCTORS
function Question(question, choices) {
  this.question = question;
  this.choices = choices;
};

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.currentQuestionIndex = 0;
};

Quiz.prototype.addValueToScore = function(choiceValue) {
  this.score += choiceValue;
  this.currentQuestionIndex++;
}

Quiz.prototype.getCurrentQuestion = function() {
  return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
  return this.currentQuestionIndex >= this.questions.length;
};

Quiz.prototype.calculateScoreAverage = function() {
  return Math.round(this.score/this.questions.length);
}

//ADD QUESTIONS TO INSTANCE OF QUIZ
var questions = [
  new Question("Do you like bows?", [{ choice: "I like bownanas", value: 2 }, { choice:"My favorite book character wears a bow!", value: 3}, {choice: "Only when they are covered in blood!", value: 4}, { choice:"They're purrrrrfect.", value: 5}]),
  new Question("Do you like taking over the world?", [{ choice: "I'd rather read a book", value: 2 }, { choice: "Once I'm finished feasting on mankind", value: 2 }, { choice: "I'm more into taking over bridges", value: 2 }, { choice: "Vote for me and we can take over the world together!", value: 2 }])
  //new Question("What's your favorite fruit?", [{ choice: "I'm crazy for bananas", value: 2 }, { choice: "Oranges. BLOOD oranges", value}])
]

var quiz = new Quiz(questions);

//FEED INFO TO UI
var QuizUI = {
  displayNext: function() {
    if(quiz.hasEnded()) {
      this.displayScore();
      this.displayAverage();
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
      this.populateIdWithHTML("choice" + i, choices[i].choice);
      this.selectionHandler("selection" + i, choices[i].value);
    }
  },

  displayScore: function() {
    var gameOverHTML = "<h1>Quiz Finished</h1>";
    gameOverHTML += "<h2>" + quiz.score + "</h2>";
    this.populateIdWithHTML("quiz", gameOverHTML);
  },

  displayAverage: function() {
    var html = "<h2>" + quiz.calculateScoreAverage() + "</h2>";
    this.populateIdWithHTML("quiz", html);
  },

  populateIdWithHTML: function(id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },

  selectionHandler: function(id, choiceValue) {
    var button = document.getElementById(id);
    button.onclick = function() {
      quiz.addValueToScore(choiceValue);
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
