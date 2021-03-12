// put in class
// Initialize timer here to prevent bug where timer gets multiplied
let timer = setInterval(function() {
  // Inner text will start with empty string, and become empty string again during answer check
  if(timerField.innerText) {
    timerField.innerText = parseFloat(timerField.innerText) - 1
  }
  if (timerField.innerText === '0') {
    doSomething()
  }
  timerColor()
}, 1000)

let timerColor = function() {
  timerField.style.color = parseFloat(timerField.innerText) > 10 ? 'green' : 'red'
}

let doSomething = function() {
  gameOver()
}