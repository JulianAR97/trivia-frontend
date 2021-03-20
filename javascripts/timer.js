// for use with setInterval called in question class
let timerPaused = true;
let timeLeft = 30;

let timerCountdown = function() {
  // Decrement timer by 1 when timer is not paused
  if (!timerPaused) {
    timerField.innerText = timeLeft
    timeLeft -= 1

    // Can only be activated if the timer is not paused and time is 0
    if (timeLeft === 0 ) {
      console.log('here')
      timerPaused = true;
      gameOver()
    }
  }
}

let timer = setInterval(timerCountdown, 1000)