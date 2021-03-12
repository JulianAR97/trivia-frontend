
let tryClass = function() {
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
  button.style.color = '#843b62';
  button.style.borderColor = '#843b62';
  button.style.borderRightWidth = '3px';
  button.style.borderBottomWidth = '3px';
  return button
}

let loadContent = function() {
  let b = document.getElementById('start');
  main.removeChild(b)
  appendScoreAndTimer()
  tryClass()
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
