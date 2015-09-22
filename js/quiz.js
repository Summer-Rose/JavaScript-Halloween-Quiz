function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.currentQuestionIndex = 0;
}

function startQuiz() {
  QuizUI.displayNext();
}
