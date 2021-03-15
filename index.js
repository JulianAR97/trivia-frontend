
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
  // maroon color 
  button.style.color = maroon;
  button.style.borderColor = maroon;
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

let gameOver = function() {
  removeAllChildren(qAndAField)
  removeAllChildren(gameHelpers)
  appendNewScoreForm()
  getTopTenScores()
}

let appendNewScoreForm = function() {
  let newScoreForm = document.createElement('form');
  let nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Enter Name'
  

  nameInput.backgroundColor = 'transparent';
  nameInput.borderColor = maroon;
  nameInput.maxLength = 3;

  newScoreForm.appendChild(nameInput);
  newScoreForm.addEventListener('submit', (e) => sendScore(e, 10))

  main.appendChild(newScoreForm);
}

let getTopTenScores = function() {
  // get scores via fetch and then append them
  fetch('http://localhost:3000/scores').then(resp => resp.json()).then(json => appendTopTenScores(json))
}

let appendTopTenScores = function(scores) {
  let tBody = createScoreTable()
  
  scores.forEach(function(s) {
    let tr = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdScore = document.createElement('td');

    tdName.innerText = s.name;
    tdScore.innerText = s.count;

    tr.appendChild(tdName);
    tr.appendChild(tdScore);

    tBody.appendChild(tr)
  })
}

let createScoreTable = function() {
  let scoreTable = document.createElement('table');
  let tHead = document.createElement('thead');
  let tBody = document.createElement('tbody');
  
  let headRow = document.createElement('tr')
  let nameHead = document.createElement('th');
  let scoreHead = document.createElement('th')
  
  nameHead.innerText = 'Name';
  scoreHead.innerText = 'Score';

  headRow.appendChild(nameHead);
  headRow.appendChild(scoreHead);
  tHead.appendChild(headRow);
  scoreTable.appendChild(tHead);
  scoreTable.appendChild(tBody);
  main.appendChild(scoreTable);

  // return tBody so we can add data to table in append scores function
  return tBody;
}

let sendScore = function(e, score) {
  // Form isn't actually submitted, page doesn't refresh
  e.preventDefault()
  // e.target is form, first child is input, value is what is user input
  let name = e.target.firstElementChild.value
  postData(name, score)
}

let postData = function(name, score) {
  
  const postScoreDataConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {name: name, count: score} )
  }

  fetch("http://localhost:3000/scores", postScoreDataConfig)
}

// Fix timer so that it doesn't hit game over twice