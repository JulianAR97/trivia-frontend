class Score {
  
  static addScore = function() {
    let score = parseFloat(scoreField.innerText)
    scoreField.innerText = score + 10;
  }

  static resetScore =  function() {
    scoreField.innerText = 0;
  }


  static createScoreTable = function() {
    let scoreTable = document.createElement('table');
    let tHead = document.createElement('thead');
    let tBody = document.createElement('tbody');
    let headRow = document.createElement('tr')
    let nameHead = document.createElement('th');
    let scoreHead = document.createElement('th')
    
    scoreTable.id = 'score-table';
    nameHead.innerText = 'Name';
    scoreHead.innerText = 'Score';
    
    [nameHead, scoreHead].forEach(ele => headRow.appendChild(ele))
    tHead.appendChild(headRow);
    
    [tHead, tBody].forEach(ele => scoreTable.appendChild(ele))
    main.appendChild(scoreTable);
  
    // return tBody so we can add data to table in append scores function
    return tBody;
  }

  static initializeNameInput = function() {
    let nameInput = document.createElement('input')
    nameInput.type = 'text';
    nameInput.id = 'name-input'
    // remove defualt styling for input field
    nameInput.style.backgroundColor = 'transparent';
    nameInput.style.border = '0';
    nameInput.maxLength = 3;
    nameInput.size = 3;
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

  static getTopTenScores = function(finalScore) {
    // get scores via fetch and then append them
    fetch('http://localhost:3000/scores')
        .then(resp => resp.json())
        .then(json => {
          Score.appendTopTenScores(json, finalScore)
          document.getElementById('name-input').focus()
        })
  }

  static appendTopTenScores = function(scores, finalScore) {
    // First add final score to array of score objects
    scores.push({name: '', count: Number(finalScore)})

    // then sort the new list of score objects 
    scores.sort((a, b) => (a.count > b.count) ? -1 : 1);

    let tBody = Score.createScoreTable()
    let nameInput;
    scores.forEach(s => {
      Score.appendScoreToTable(s, nameInput, tBody)
    })

  }

  static appendScoreToTable = function(score, nameInput, tableBody) {
    let tr = document.createElement('tr');
    // Array(2).fill('abc') = ['abc', 'abc']
    let tdName = document.createElement('td');
    let tdScore = document.createElement('td');
    
    if (!score.name) {
      nameInput = Score.createNameInput(score.count)
      tdName.appendChild(nameInput)
    } else {
      tdName.innerText = score.name;
    }
    // tdName.innerText = score.name;
    tdScore.innerText = score.count;
    [tdName, tdScore].forEach(td => tr.appendChild(td))
    tableBody.appendChild(tr)
  }

  // Event handler for <enter> on name input field
  static sendScore = function(e) {
    // Form isn't actually submitted, page doesn't refresh
    e.preventDefault()
    // e.target is form, first child is input, value is what is user input
    let name = e.target.value
    let score = e.target.finalScore
    debugger;
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