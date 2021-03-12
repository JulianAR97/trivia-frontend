
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
  b.className = 'btn btn-primary';
  b.style.backgroundColor = 'transparent';
  b.style.color = '#843b62';
  b.style.borderColor = '#843b62';
  b.style.borderRightWidth = '3px';
  b.style.borderBottomWidth = '3px';

  b.id = 'start';
  b.innerText = "Start";
  main.appendChild(b)
  b.addEventListener('click', loadContent)
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


  pScore.innerHTML = 'Score: <span id="score">0</span>'
  pTimer.innerHTML = 'Timer: <span id="timer"></span>'
  
  gameHelpers.appendChild(pScore);
  gameHelpers.appendChild(pTimer);

  // previously defined in globals
  scoreField = document.getElementById('score');
  timerField = document.getElementById('timer');

}
