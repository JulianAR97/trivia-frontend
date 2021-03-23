function removeAllChildren(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild)
  }
}
// add a loading sign until content loaded

let start = function() {
  listCategories();
}

let listCategories = function() {
  for (let key in questionCategories) {
    let p = document.createElement('p');
    p.className = 'question-category'
    p.id = questionCategories[key]
    p.innerText = key;
    p.addEventListener('click', loadContent)
    main.appendChild(p)
    main.appendChild(document.createElement('br'))
  }
}

let getQuestions = function(category) {
  // Get endpoint from questionCategories Object in globals and append it to apiURL in globals
  let endpoint = questionCategories[category]
  fetch(apiURL + endpoint)
    .then(resp => resp.json())
    .then(json => {
      setQuestions(json)
      q = new Question;
      q.getQuestion()
    })
}

// Add button style in js because can't override bootstrap in css file
let addButtonStyle = function(button) {
  button.className = 'btn btn-primary';
  button.style.backgroundColor = 'transparent';
  // maroon color 
  button.style.color = customMaroon;
  button.style.borderColor = customMaroon;
  button.style.borderRightWidth = '3px';
  button.style.borderBottomWidth = '3px';
  return button
}

let setQuestions = function(json) {
  questionList = json
  console.log(questionList)
}

let removeCategoriesFromMain = function(categories, leftDiv) {
  // If the questions are in the main div, move them to left div
  if (!!document.querySelectorAll("#main > p.question-category")[0]) {
    categories.forEach(category => {
      main.removeChild(category);
      leftDiv.appendChild(category);
      leftDiv.appendChild(document.createElement('br'))
    })
    appendScoreAndTimer()
  }
}

let loadContent = function(e) {
  let categories = document.querySelectorAll('p.question-category');
  let leftDiv = document.querySelector("body > div.row > div:nth-child(1)");
  leftDiv.align = 'center'
  removeCategoriesFromMain(categories, leftDiv)

  // Save to variable defined in globals for later use;
  selectedCategory = e.target.innerText;
  getQuestions(selectedCategory)
}

let appendScoreAndTimer = function() {
  let pScore = document.createElement('p')
  let pTimer = document.createElement('p')


  pScore.innerHTML = '<h4>Score: <span id="score">0</span></h4>'
  pTimer.innerHTML = '<h4>Timer: <span id="timer"></span></h4>'
  
  gameHelpers.appendChild(pScore);
  gameHelpers.appendChild(pTimer);

  // previously defined in globals
  scoreField = document.getElementById('score');
  timerField = document.getElementById('timer');

}

let removeCategories = function() {
  let breaks = document.querySelectorAll('div#main > br')
  breaks.forEach(br => main.removeChild(br));
  let leftDiv = document.querySelector("body > div.row > div:nth-child(1)")
  removeAllChildren(leftDiv)
}
let gameOver = function() {
  removeCategories()
  let finalScore = scoreField.innerText
  removeAllChildren(questionField)
  removeAllChildren(gameHelpers)
  removeAllChildren(answerField)
  Score.fetchTopTenScores(finalScore)
}

let startGameHTML = function() {
  // First, remove left and right divs created during endgame
  [document.getElementById('left-div'), document.getElementById('right-div')].forEach(div => {
    main.removeChild(div)
  })
  
  // Then reset div classnames for divs not used during endgame
  document.querySelectorAll('div.no-class').forEach(div => {
    div.className = 'col-sm-3'
  });
  
  // Change main className back
  main.className = 'col-sm-6'
}


let resetGame = function() {
  // After sending score to back end, remove table, and start over
  alert('Score successfully submitted!')
  startGameHTML()
  start()
}

