// Add array prototype method random for use thoughout application
Array.prototype.random = function() {
  return this[Math.floor((Math.random()*this.length))]
}
// Define category and difficulty parameters for use with cocktail-trivia-api
const difficulties = ['easy', 'medium', 'hard']
const questionCategories = ['animals', 'art', 'books', 'celebrities', 'entertainment-board-games', 'entertainment-comics', 
  'entertainment-film', 'entertainment-music', 'entertainment-musicals-theatres', 'entertainment-tv', 'entertainment-video-games', 
  'general-knowledge', 'geography', 'history', 'mythology', 'politics', 'science-computers', 'science-gadgets', 'sports', 'vehicles']
const main = document.getElementById('main')

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
  main.appendChild(p)
  question.answers.forEach(a => appendAnswer(a))
}

let appendAnswer = function(answer) {
  let p = document.createElement('p')
  p.innerText = answer.text
  // conditional styling for testing
  if (answer.correct) {
    p.style.color = 'green'
  } else {
    p.style.color = 'red'
  }
  main.appendChild(p);
}

