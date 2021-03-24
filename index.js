// add a loading sign until content loaded

let start = function() {
  listCategories();
}

// Add 'links' for all question categories and append to DOM
let listCategories = function() {
  // key is category itself
  for (let key in questionCategories) {
    let p = document.createElement('p');
    p.className = 'question-category'
    p.id = questionCategories[key]
    p.innerHTML = `<b>${key}<b>`;
    p.addEventListener('click', loadContent)
    main.appendChild(p)
    main.appendChild(document.createElement('br'))
  }
}

let loadContent = function(e) {
  let categories = document.querySelectorAll('p.question-category');
  let leftDiv = document.querySelector("body > div.row > div:nth-child(1)");
  leftDiv.align = 'center'
  removeCategoriesFromMain(categories, leftDiv)

  // Save to variable defined in globals for later use;
  selectedCategory = e.target.innerText;
  getQuestions(selectedCategory) // helpers.js
}

let gameOver = function() {
  removeCategories() // helpers.js
  let finalScore = scoreField.innerText
  removeQuestionAndAnswers() //helpers.js
  removeAllChildren(gameHelpers) //helpers.js
  Score.fetchTopTenScores(finalScore)
}

let resetGame = function() {
  // After sending score to back end, remove table, and start over
  alert('Score successfully submitted!')
  startGameHTML()
  start()
}

