// Add array prototype method random for use thoughout application
Array.prototype.random = function() {
  return this[Math.floor((Math.random()*this.length))]
}
// Define category and difficulty parameters for use with cocktail-trivia-api

// Keys are categories and values are api endpoints
const questionCategories = {
  'Animals': 'animals',
  'Art': 'art',
  'Board Games': 'entertainment-board-games',
  'Books': 'entertainment-books',
  'Celebrities': 'celebrities',
  'Comics': 'entertainment-comics',
  'Computers': 'science-computers',
  'Film': 'entertainment-film',
  'Gadgets': 'science-gadgets',
  'General Knowledge': 'general-knowledge',
  'Geography': 'geography',
  'History': 'history',
  'Music': 'entertainment-music',
  'Musicals': 'entertainment-musicals-theatres',
  'Mythology': 'mythology',
  'Politics': 'politics',
  'Sports': 'sports',
  'T.V.': 'entertainment-tv',
  'Vehicles': 'vehicles',
  'Video Games': 'entertainment-video-games',
}

const apiURL = 'http://cocktail-trivia-api.herokuapp.com/api/category/'
const customMaroon = '#843b62';
const customSalmon = '#ffb997';
const body = document.getElementsByTagName('body')[0]
const main = document.getElementById('main')
const gameHelpers = document.getElementById('game-helpers')
const qAndAField = document.getElementById('question-and-answers')
const questionField = document.getElementById('question')
const answerField = document.getElementById('answers')
let scoreField;
let timerField;
let questionList;
let selectedCategory;

// cool js stuff

