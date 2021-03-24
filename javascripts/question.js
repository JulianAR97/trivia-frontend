class Question {
  // params is a hash with difficulty and category
  constructor() {
    // Initialize at null, and set when getQuestion() is called 
    this.questionContent = null;
    this.answers = null;
    this.correctAnswer = null;
    this.correctAnswerField = null;
  }

  getQuestion() {
    let q = questionList.pop();
    // Convert strings to symbols through sanitize
    this.questionContent = sanitize(q.text);
    q.answers.forEach(ans => ans.text = sanitize(ans.text));
    this.answers = q.answers;
    this.correctAnswer = this.answers.find(answer => answer.correct);
    this.displayQuestion()
  }

  displayQuestion() {
    let p = document.createElement('p');
    p.innerText = this.questionContent
    // Question field is defined in globals
    questionField.appendChild(p)

    // a, i = answer, index
    this.answers.forEach(function(a, i) {
      a.text = sanitize(a.text)
      this.appendAnswer(a, i + 1)
    }.bind(this))

    timeLeft = 30;
    timerPaused = false;
  }

  appendAnswer(answer, index) {
    // 'this' is instance of question class
    let b = document.createElement('button')
    addButtonStyle(b)
    // add answer class to format buttons into 2 x 2 grid
    b.classList.add('answer')
    b.id = `a${index}`
    b.innerText = answer.text
    // answerField is defined in globals
    answerField.appendChild(b);

    if (answer.text === this.correctAnswer.text) {
      b.correctAnswer = true;
      this.correctAnswerField = b
    } else {
      b.correctAnswer = false; 
    }

    b.addEventListener('click', this.checkAnswer.bind(this))
  }


  checkAnswer(e) {
    timerPaused = true;

    if (e.target.correctAnswer) {
      //First remove style added by addButtonStyle() in index.js
      e.target.style = {}
      // Then set className based on bootstrap
      e.target.className = 'answer btn btn-success'
      Score.addScore()
      setTimeout(function() {
        removeQuestionAndAnswers()
        let q = new Question
        q.getQuestion()
      }, 3000)
    } else {
      // First remove style added by addButtonStyle() in index.js
      e.target.style = {};;
      e.target.className = 'answer btn btn-danger';
      this.correctAnswerField.style = {}
      this.correctAnswerField.className = 'answer btn btn-success'
      setTimeout(gameOver, 3000)
    }
  }
}


