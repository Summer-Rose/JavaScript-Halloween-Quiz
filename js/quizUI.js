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
      this.selectionHandler("selection" + i, choices[i]);
    }
  },

  displayResults: function() {
    var results = "<h1>Quiz Finished</h1>";
    results += "<h2>You should be...</h2>";
    this.populateIdWithHTML("quiz", results);
  },

  populateIdWithHTML: function(id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },

  selectionHandler: function(id, choice) {
    var button = documnent.getElementById(id);
    button.onclick = function() {
      quiz.choice(choice);
      QuizUI.displayNext();
    }
  },

  displayProgress: function() {
    var currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.populateIdWithHTML("progress", "Question" + currentQuestionNumber + "of" + quiz.questions.lenghth);
  }
}
