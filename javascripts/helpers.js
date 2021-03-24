let removeAllChildren = function(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild)
  }
}

// Removes question content from div nested in main
let removeQuestionAndAnswers = function() {
  removeAllChildren(questionField)
  removeAllChildren(answerField)
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

let setQuestions = function(json) {
  questionList = json // defined in globals
  console.log(questionList)
}


let startGameHTML = function() {
  // First, remove left and right divs created during endgame

  [document.getElementById('left-div'), document.getElementById('right-div')].forEach(div => {
    main.removeChild(div)
  })

  main.removeChild(document.getElementById('scoreboard'))
  
  // Then reset div classnames for divs not used during endgame
  document.querySelectorAll('div.no-class').forEach(div => {
    div.className = 'col-sm-3'
  });
  
  // Change main className back
  main.className = 'col-sm-6'
}

let removeCategoriesFromMain = function(categories, leftDiv) {
  // If the questions are in the main div, move them to left div
  if (!!document.querySelectorAll("#main > p.question-category")[0]) {
    categories.forEach(category => {
      main.removeChild(category);
      leftDiv.appendChild(category);
      leftDiv.appendChild(document.createElement('br'))
    }) 
    appendScoreAndTimer() // helpers.js
  } else {
    removeQuestionAndAnswers() // helpers.js
  }
}


let removeCategories = function() {
  let breaks = document.querySelectorAll('div#main > br')
  breaks.forEach(br => main.removeChild(br));
  let leftDiv = document.querySelector("body > div.row > div:nth-child(1)")
  removeAllChildren(leftDiv)
}

let categoryToSlug = function(category) {
  if (category === 'T.V.') {
    return 't-v'
  } else {
    return category.split(' ').join('-')
  }
}