class Score {
  
  static addScore() {
    let score = parseFloat(scoreField.innerText)
    scoreField.innerText = score + 10;
  }

  static resetScore() {
    scoreField.innerText = 0;
  }
  static createScoreTable() {
    let scoreTable = document.createElement('table');
    scoreTable.id = 'score-table';
    let tHead = document.createElement('thead');
    let tBody = document.createElement('tbody');
    
    let headRow = document.createElement('tr')
    let nameHead = document.createElement('th');
    let scoreHead = document.createElement('th')
    
    nameHead.innerText = 'Name';
    scoreHead.innerText = 'Score';
    
    // can I pass an array
    headRow.appendChild(nameHead);
    headRow.appendChild(scoreHead);
    tHead.appendChild(headRow);
    scoreTable.appendChild(tHead);
    scoreTable.appendChild(tBody);
    main.appendChild(scoreTable);
  
    // return tBody so we can add data to table in append scores function
    return tBody;
  }

  static createNameInput = function(score) {
    let nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name-input'
    // remove defualt styling for input field
    nameInput.style.backgroundColor = 'transparent';
    nameInput.style.border = '0';
    nameInput.maxLength = 3;
    nameInput.size = 3;
  
    nameInput.addEventListener('keypress', function(e, score) {
      if (e.key === 'Enter') {
        console.log('here')
        Score.sendScore(e, score)
        resetGame();
      }
    })
    return nameInput;
  }

  static getTopTenScores = function(finalScore) {
    // get scores via fetch and then append them
    fetch('http://localhost:3000/scores').then(resp => resp.json()).then(json => Score.appendTopTenScores(json, finalScore))
  }

  static appendTopTenScores = function(scores, finalScore) {
    // First add final score to array of score objects
    scores.push({name: '', count: Number(finalScore)})

    // then sort the new list of score objects 
    scores.sort((a, b) => (a.count > b.count) ? -1 : 1);

    let tBody = Score.createScoreTable()
    let nameInput;
    scores.forEach(function(s) {
      let tr = document.createElement('tr');
      let tdName = document.createElement('td');
      let tdScore = document.createElement('td');
      if (!s.name) {
        nameInput = Score.createNameInput(s.count)
        tdName.appendChild(nameInput)
      } else {
        tdName.innerText = s.name;
      }
  
      // tdName.innerText = s.name;
      tdScore.innerText = s.count;
  
      tr.appendChild(tdName);
      tr.appendChild(tdScore);
  
      tBody.appendChild(tr)
    })

    nameInput.focus();
    nameInput.select();
  }

  // Event handler for <enter> on name input field
  static sendScore = function(e, score) {
    // Form isn't actually submitted, page doesn't refresh
    e.preventDefault()
    // e.target is form, first child is input, value is what is user input
    let name = e.target.value
    Score.postData(name, score)

  }
  
  static postData = function(name, score) {
    
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
}