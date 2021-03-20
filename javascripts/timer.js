// put in class
// Initialize timer here to prevent bug where timer gets multiplied
let timerPaused = true;
let timeLeft = 30;

let timerCountdown = function() {
  if (!timerPaused) {
    timerField.innerText = timeLeft
    timeLeft -= 1

    if (timeLeft === 0 ) {
      console.log('here')
      timerPaused = true;
      gameOver()
    }
  }
}