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


// To remove classNames from left and right divs
let testFunc = function() {
  main.removeChild(document.getElementById('start'))
  document.querySelectorAll('div.col-sm-3').forEach(e => e.className = 'no-class')
  main.className = 'col-xs-12'
  let leftDiv = document.createElement('div')
  let rightDiv = document.createElement('div')
  leftDiv.className = 'col-xs-3 col-lg-4'
  rightDiv.className = 'col-xs-9 col-lg-8'
  ['jul', 'kyl', 'tay', 'kay', 'cas', 'ali', 'mik', 'reg'].forEach(function(e) {
    let h = document.createElement('h4')
    h.style.color = customMaroon
    h.innerText = e 
    leftDiv.appendChild(h)
  })
  main.appendChild(leftDiv);
  
  ['70%', '65%', '60%', '55%', '50%', '45%', '40%', '35%'].forEach(e => {
    let h = document.createElement('h4')
    h.innerText = e.slice(0, -1);
    h.className = 'score-header'
    h.style.color = customSalmon;
    h.style.backgroundColor = customMaroon
    h.style.width = e
    rightDiv.appendChild(h)
  })
  main.appendChild(rightDiv)
  
  
  let nameInput = Score.initializeNameInput()

}
