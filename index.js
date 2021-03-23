
let randomizeQuestion = function() {
  let q = new Question({'category': questionCategories.random(), 'difficulty': difficulties.random()})
  q.getQuestion()
}

function removeAllChildren(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild)
  }
}
// add a loading sign until content loaded

let start = function() {
  addStartButton()
}

let addStartButton = function() {
  let b = document.createElement('button');
  addButtonStyle(b);
  b.id = 'start';
  b.innerText = "Start";
  main.appendChild(b)
  b.addEventListener('click', loadContent)
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

let loadContent = function() {
  let b = document.getElementById('start');
  main.removeChild(b)
  appendScoreAndTimer()
  randomizeQuestion()
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

let gameOver = function() {
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

