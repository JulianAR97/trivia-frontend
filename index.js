// Add array prototype method random for use thoughout application
Array.prototype.random = function() {
  return this[Math.floor((Math.random()*this.length))]
}
// Define category and difficulty parameters for use with cocktail-trivia-api
const difficulties = ['easy', 'medium', 'hard']
const questionCategories = ['animals', 'art', 'books', 'celebrities', 'entertainment-board-games', 'entertainment-comics', 
  'entertainment-film', 'entertainment-music', 'entertainment-musicals-theatres', 'entertainment-tv', 'entertainment-video-games', 
  'general-knowledge', 'geography', 'history', 'mythology', 'politics', 'science-computers', 'science-gadgets', 'sports', 'vehicles']


let getQuestion = function() {
  // Get a random category and difficulty from previously defined constants
  let category = questionCategories.random()
  let difficulty = difficulties.random()
  let url = `http://cocktail-trivia-api.herokuapp.com/api/category/${category}/difficulty/${difficulty}/count/1`
  fetch(url).then(resp => resp.json()).then(json => displayQuestion(json))
}

