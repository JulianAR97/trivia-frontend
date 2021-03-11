// Add array prototype method random for use thoughout application
Array.prototype.random = function() {
  return this[Math.floor((Math.random()*this.length))]
}
// Define category and difficulty parameters for use with cocktail-trivia-api
const difficulties = ['easy', 'medium', 'hard']
const questionCategories = [
  'animals', 'art', 'celebrities', 'entertainment-board-games', 'entertainment-books', 
  'entertainment-comics', 'entertainment-film', 'entertainment-music', 'entertainment-musicals-theatres', 
  'entertainment-tv', 'entertainment-video-games', 'general-knowledge', 'geography', 'history', 'mythology', 
  'politics', 'science-computers', 'science-gadgets', 'sports', 'vehicles'
]

const body = document.getElementsByTagName('body')[0]
const main = document.getElementById('main')
const gameHelpers = document.getElementById('game-helpers')
const qAndAField = document.getElementById('question-and-answers')
const questionField = document.getElementById('question')
const answerField = document.getElementById('answers')
let scoreField;
let timerField;

// cool js stuff
difficulties.random() = difficulties[Math.floor(Math.random() * difficulties.length)]
questionCategories.random() = questionCategories[Math.floor(Math.random() * questionCategories.length)]
