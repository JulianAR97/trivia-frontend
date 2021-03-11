class Score {
  
  static addScore() {
    let score = parseFloat(scoreField.innerText)
    scoreField.innerText = score + 10;
  }

  static resetScore() {
    scoreField.innerText = 0;
  }
}