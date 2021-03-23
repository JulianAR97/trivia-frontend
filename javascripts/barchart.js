// start with data in array of objects [{name: 'x', count: x}]

// First create html div with width of container
// Nest two contatiners, one with width of 3 and the other with width of 9
// First container has class col-xs-3 col-lg-4
// Second has class col-xs-9 col-lg-8
// Both should have align="center"
// right div should have align="center"
// Must change the classname for div following main and div before main to ''
// Change main div to col-xs-12
// Use H4 for charts
let gameOverHTML = function() {
  document.querySelectorAll('div.col-sm-3').forEach(e => e.className = 'no-class')
  main.className = 'col-xs-12'
  let leftDiv = document.createElement('div')
  let rightDiv = document.createElement('div')
  leftDiv.className = 'col-xs-3 col-lg-4'
  rightDiv.className = 'col-xs-9 col-lg-8'
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
    // let nameHeader = document.createElement('h4');
    // nameHeader.style.color = customMaroon;
    // nameHeader.innerText = s.name;
    // leftDiv.appendChild(nameHeader);

    // let scoreHeader = document.createElement('h4');
    // scoreHeader.innerText = s.count;
    // scoreHeader.className = 'score-header';
    // scoreHeader.style.color = customSalmon;
    // scoreHeader.style.backgroundColor = customMaroon;
    // scoreHeader.style.width = s.count + '%'
    // rightDiv.appendChild(scoreHeader);
  })
  debugger;
  main.appendChild(leftDiv);
  main.appendChild(rightDiv);
  
  
  // let nameInput = Score.initializeNameInput()
  // return ([nameInput, leftDiv, rightDiv])
  
}



// ['jul', 'kyl', 'tay', 'kay', 'cas', 'ali', 'mik', 'reg'].forEach(e => {
//   debugger;
//   let h = document.createElement('h4')
//   h.style.color = customMaroon
//   h.innerText = e 
//   leftDiv.appendChild(h)
// })
// main.appendChild(leftDiv);

// ['70%', '65%', '60%', '55%', '50%', '45%', '40%', '35%'].forEach(e => {
//   let h = document.createElement('h4')
//   h.innerText = e.slice(0, -1);
//   h.className = 'score-header'
//   h.style.color = customSalmon;
//   h.style.backgroundColor = customMaroon
//   h.style.width = e
//   rightDiv.appendChild(h)
// })
// main.appendChild(rightDiv)