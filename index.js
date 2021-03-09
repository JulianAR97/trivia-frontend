// Add array prototype method random for use thoughout application
Array.prototype.random = function() {
  return this[Math.floor((Math.random()*this.length))]
}
// Define category and difficulty parameters for use with cocktail-trivia-api
const difficulties = ['easy', 'medium', 'hard']
const questionCategories = ['animals', 'art', 'books', 'celebrities', 'entertainment-board-games', 'entertainment-comics', 
  'entertainment-film', 'entertainment-music', 'entertainment-musicals-theatres', 'entertainment-tv', 'entertainment-video-games', 
  'general-knowledge', 'geography', 'history', 'mythology', 'politics', 'science-computers', 'science-gadgets', 'sports', 'vehicles']
const questionField = document.getElementById('question')




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
  let correctAnswer = question.answers.find(answer => answer.correct)
  
  // add question to main div
  let p = document.createElement('p')
  p.innerText = question.text
  questionField.appendChild(p)
  question.answers.forEach((a) => appendAnswer(a, correctAnswer))
}

let appendAnswer = function(answer, correctAnswer) {
  console.log(correctAnswer)
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
  setTimeout(removeAllChildren, 2000, questionField)
  setTimeout(getQuestion, 2000)
}

let addScore = function() {
  let scoreField = document.querySelector("#score > p")
  // inner text is "Score: 0", so we need to split and convert to integer
  let score = parseFloat(scoreField.innerText.split(': ')[1], 10) + 10
  scoreField.innerText = 'Score: ' + score
}

let resetScore = function() {
  let scoreField = document.querySelector("#score > p")
  scoreField.innerText = 'Score: 0'
}

// Using this function to clear question field
let removeAllChildren = function(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild)
  }
}


// add a loading sign until content loaded
