let gameOverHTML = function() {
  document.querySelectorAll('div.col-sm-3').forEach(e => e.className = 'no-class')
  main.className = 'col-xs-12'
  let h = document.createElement('h2');
  h.innerText = 'Scoreboard';
  h.id = 'scoreboard'
  main.appendChild(h)
  let leftDiv = document.createElement('div')
  let rightDiv = document.createElement('div')
  leftDiv.className = 'col-xs-3 col-lg-4'
  rightDiv.className = 'col-xs-9 col-lg-8'
  leftDiv.id = 'left-div';
  rightDiv.id = 'right-div'
  leftDiv.align = 'right';
  rightDiv.align = 'left';
  return [leftDiv, rightDiv]
}

let listName = function(score, div) {
  let h = document.createElement('h4');
  h.style.color = customMaroon;
  /* If there is no name for the player, i.e. the player is from the current game
  create a name input for them, otherwise, use name from json */
  if (score.name === '') {
    nameInput = Score.createNameInput(score.count)
    h.appendChild(nameInput)
  } else {
    h.innerText = score.name
  }
  div.appendChild(h);
  return div;
} 

let listScore = function(score, div) {
  // TODO: create scale to protect against scores that are over 70, 
  // we don't want scores over 70% width of container
  let h = document.createElement('h4')
  h.innerText = score;
  h.className = 'score-header';
  h.style.color = customSalmon;
  h.style.backgroundColor = customMaroon;

  // Set width to minimum of 3% so it's not invisible
  h.style.width = score === 0 ? '3%' : score + '%'
  div.appendChild(h);
  return div;
  
}
// To remove classNames from left and right divs
let createBarChart = function(scores) {
  [leftDiv, rightDiv] = gameOverHTML()
  scores.forEach(s => {
    listName(s, leftDiv)
    listScore(s.count, rightDiv)
  })

  main.appendChild(leftDiv);
  main.appendChild(rightDiv);
  document.getElementById('name-input').focus();  
}


// Autoselect input field;