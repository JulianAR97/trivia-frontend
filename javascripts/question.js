class Question {
  // params is a hash with difficulty and category
  constructor(params) {
    this.category = params.category
    this.difficulty = params.difficulty
    // Initialize at null, and set when getQuestion() is called 
    this.questionContent = null;
    this.answers = null;
    this.correctAnswer = null;
    this.correctAnswerField = null;
  }

  getQuestion() {
    let url = `http://cocktail-trivia-api.herokuapp.com/api/category/${this.category}/difficulty/${this.difficulty}/count/1`
    // json gives an object in the form 1 : {text: 'This value is actually the question', answers: 'array of answers'}
    fetch(url).then(resp => resp.json()).then(function(json) {
      // sanitize is defined in sanitize.js, and corrects characters that were not rendered
      // e.g. '&eacute' to 'é'
      let q = json[0]
      this.questionContent = sanitize(q.text)
      this.answers = q.answers
      // Each element of answers array will have an object with a key of 'correct', and a boolean val
      this.correctAnswer = this.answers.find(answer => answer.correct);
      this.displayQuestion()
    }.bind(this))
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

    timerField.innerText = 30
  }

  appendAnswer(answer, index) {
    // 'this' is instance of question class
    let b = document.createElement('button')
    b.className = 'answer btn btn-default'
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
    if (e.target.correctAnswer) {
      e.target.className = 'answer btn btn-success'
      Score.addScore()
    } else {
      // set background to red, and highlight correct answer
      e.target.className = 'answer btn btn-danger'
      this.correctAnswerField.className = 'answer btn btn-success'
      setTimeout(Score.resetScore, 2000)
    }
    timerField.innerText = '';
    setTimeout(function() {
      removeAllChildren(questionField)
      removeAllChildren(answerField)
      new Question({'category': questionCategories.random(), 'difficulty': difficulties.random()}).getQuestion()
    }, 1000)
  }

}

// Does correct answer get sanitized