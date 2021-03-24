class Score {
  
  static addScore = function() {
    let score = parseFloat(scoreField.innerText)
    scoreField.innerText = score + 10;
  }

  static resetScore =  function() {
    scoreField.innerText = 0;
  }

  // initializeNameInput => createNameInput => Add event handler handleEnter
  static initializeNameInput = function() {
    let nameInput = document.createElement('input')
    nameInput.type = 'text';
    nameInput.id = 'name-input'
    // remove defualt styling for input field
    nameInput.style.backgroundColor = 'transparent';
    nameInput.style.border = '0';
    nameInput.maxLength = 3;
    nameInput.size = 2;
    return nameInput;
    
  }
  
  static createNameInput = function(score) {
    let nameInput = Score.initializeNameInput()
    nameInput.finalScore = score;
    
    nameInput.addEventListener('keypress', e => Score.handleEnter(e))
    return nameInput;
  }

  static handleEnter = function(e) {
    if (e.key === 'Enter') {
      Score.sendScore(e)
      resetGame();
    }
  }

  static fetchTopTenScores = function(finalScore) {
    // get scores via fetch and then append them
    fetch(`http://localhost:3000/${categoryToSlug(selectedCategory)}/scores`)
        .then(resp => resp.json())
        .then(json => {
          let scores = Score.addScoreToTopTen(json, finalScore)
          createBarChart(scores)
        })
  }

  static addScoreToTopTen = function(scores, finalScore) {
    // First add final score to array of score objects
    scores.push({name: '', count: Number(finalScore)})

    // then sort the new list of score objects 
    scores.sort((a, b) => (a.count > b.count) ? -1 : 1);
    return scores;

  }

  // Event handler for <enter> on name input field
  static sendScore = function(e) {
    // Form isn't actually submitted, page doesn't refresh
    e.preventDefault()
    // e.target is form, first child is input, value is what is user input
    let name = e.target.value
    let score = e.target.finalScore
    Score.postData(name, score)

  }
  
  static postData = function(name, score) {
    console.log('here')
    const postScoreDataConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {name: name, count: score, category: selectedCategory} )
    }
  
    fetch("http://localhost:3000/scores", postScoreDataConfig)
  }
}