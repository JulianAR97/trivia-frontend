
let getQuestion = function() {
  // Get a random category and difficulty from previously defined constants
  let category = questionCategories.random()
  let difficulty = difficulties.random()
  let url = `http://cocktail-trivia-api.herokuapp.com/api/category/${category}/difficulty/${difficulty}/count/1`
  // We only need the first element of json because we are only handling one question at at time
  fetch(url).then(resp => resp.json()).then(json => displayQuestion(json[0]))
}

let displayQuestion = function(question) {
  // question object is in form {text: 'This value is actually the question', answers: 'array of answers'}
  // answers array is in form [{correct: false, text: 'Answer Text'}, {correct: true, text: 'Answer Text'}, ..., ...]
  // sanitize allows us to convert symbols like &#039; that we receive from api into human readable font
  question.text = sanitize(question.text)
  let correctAnswer = question.answers.find(answer => answer.correct)
  
  // add question to div
  let p = document.createElement('p')
  p.innerText = question.text
  questionField.appendChild(p)
  
  // add each answer to div
  question.answers.forEach(function(a){
    a.text = sanitize(a.text)
    appendAnswer(a, correctAnswer)
  })

  // reset timer to 30
  timerField.innerText = 30
}

let appendAnswer = function(answer, correctAnswer) {
  // add each answer to div
  let p = document.createElement('p')
  p.innerText = answer.text
  questionField.appendChild(p);

  // Add value to p variable to check if answer is correct or not
  if (correctAnswer.text === answer.text) {
    p.correctAnswer = true;
  } else {
    p.correctAnswer = false;
  }

  p.addEventListener('click', checkAnswer)
}

let checkAnswer = function(e) {
  // this is p div
  if (this.correctAnswer) {
    this.style.color = 'green'
    // add 1 second delay before tallying 
    addScore()
  } else {
    this.style.color = 'red'
    setTimeout(resetScore, 1000)
  }
  timerField.innerText = ''
  setTimeout(function () {
    removeAllChildren(questionField) 
    getQuestion()
   }, 1000)
}

let addScore = function() {
  let scoreField = document.getElementById('score');
  // inner text is must be converted to integer to increment
  let score = parseFloat(scoreField.innerText);
  scoreField.innerText = score + 10;
}

let resetScore = function() {
  let scoreField = document.getElementById('score');
  scoreField.innerText = 0
}

// Using this function to clear question field
let removeAllChildren = function(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild)
  }
}


// add a loading sign until content loaded
