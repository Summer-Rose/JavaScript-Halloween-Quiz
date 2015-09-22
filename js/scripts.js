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
  new Question("Do you like bows?", [{ choice: "I like bownanas", value: 1 }, { choice:"My favorite book character wears a bow!", value: 2}, {choice: "Only when they are covered in blood!", value: 3}, { choice:"They're purrrrrfect.", value: 4}]),
  new Question("Do you like taking over the world?", [{ choice: "I'd rather read a book", value: 1 }, { choice: "Once I'm finished feasting on mankind", value: 2 }, { choice: "I'm more into taking over bridges", value: 3 }, { choice: "Vote for me and we can take over the world together!", value: 4 }]),
  new Question("What's your favorite fruit?", [{ choice: "I'm crazy for bananas", value: 1 }, { choice: "Oranges. BLOOD oranges", value: 2}, { choice: "Everything except poison apples", value: 3}, { choice: "Whatever I find under the bridge", value: 4}])
]

var quiz = new Quiz(questions);

//FEED INFO TO UI
var QuizUI = {
  displayNext: function() {
    if(quiz.hasEnded()) {
      this.displayAverage();
      //this.displayImage();
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
  //
  // displayScore: function() {
  //   var gameOverHTML = "<h1>Quiz Finished</h1>";
  //   gameOverHTML += "<h2>" + quiz.score + "</h2>";
  //   this.populateIdWithHTML("quiz", gameOverHTML);
  // },

  displayAverage: function() {
    var average = quiz.calculateScoreAverage();
    var results = "";

    if (average === 1) {
      results += "You should be Hello Kitty";
      $("#resultingImage").show();
      $("#quiz").hide();
      $("#resultingImage").addClass("hello-kitty");
    } else if (average === 2) {
      results += "You should be a banana";
      $("#resultingImage").show();
      $("#quiz").hide();
      $("#resultingImage").addClass("banana");
    } else if (average === 3) {
      results += "You should be a vampire";
      $("#resultingImage").show();
      $("#quiz").hide();
      $("#resultingImage").addClass("vampire");
    } else if (average === 4) {
      results += "You should be a troll";
      $("#resultingImage").show();
      $("#quiz").hide();
      $("#resultingImage").addClass("troll");
    } else {
      results += "You should be a politician";
      $("#resultingImage").show();
      $("#quiz").hide();
      $("#resultingImage").addClass("politician");
    }

    this.populateIdWithHTML("results", results);
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
