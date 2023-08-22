

/* HTML-теги */
const templateCell = document.querySelector("#empty-cell");

/* Classes */
const mainClass = 'gallows';
const groupCellsClass = 'gallows-group-inner';
const cellClass = "gallows-cell";

/* Счетчики игры */
let statusGame = {
  countFalis: 0,
  maxCountFalis: 7,
  countGuessLetter: 0
}

/* Красим поля в красный цвет */
const paintTheInputs = () => {
  document.querySelector(`.${groupCellsClass}`).classList.add(`${groupCellsClass}--lose`);
}

/* Проверка состояния игры */
const checkStateGame = (word) => {
  if(statusGame.countFalis >= statusGame.maxCountFalis) {
    document.querySelectorAll(`.${cellClass}`).forEach(_e => {
      _e.disabled = true;
    });
    paintTheInputs();
    endDialogue(false);
  }
  if(statusGame.countGuessLetter === word.length) {
    endDialogue(true);
  }
}

/* Генерируем поля для вставки букв */
const generateGame = (_groupCellsClass, _cellsClass, word) => {
  
  for(let i = 0; i < word.length; i++) {

    let clone = templateCell.content.cloneNode(true),
        cell = clone.querySelector(`.${_cellsClass}`);
        cell.dataset.index = i;
        
        document.querySelector(`.${_groupCellsClass}`).appendChild(cell);
        document.querySelector(`.${_groupCellsClass}`).style = `grid-template-columns: repeat(${word.length}, 1fr)`
  }
  document.querySelector(`.${_groupCellsClass}`).style.height = `${document.querySelector(`.${_cellsClass}`).offsetWidth / 2}px`;
}

/* Проверяем букву и вставляем */
const checkAndInsertLetter = (word, _cellsClass) => {
  document.querySelectorAll(`.${_cellsClass}`).forEach(el => {
    el.addEventListener("keypress", (_e) => {
      
      if (_e.target.dataset.index == word.indexOf(_e.key, _e.target.dataset.index)) {
        _e.target.value = _e.key;
        _e.target.disabled = true;
        _e.target.classList.add(`${_cellsClass}--success`);
        _e.target.nextElementSibling?.focus();
        statusGame.countGuessLetter = statusGame.countGuessLetter + 1;
      }
      else {
        _e.preventDefault();
        statusGame.countFalis = statusGame.countFalis + 1;
        console.log("No");
        _e.target.classList.add(`${_cellsClass}--error`);
        setTimeout(() => {
          _e.target.classList.remove(`${_cellsClass}--error`);
        }, 500)
        document.querySelectorAll(`[data-path="${statusGame.countFalis}"]`).forEach(__e => {
          __e.style.opacity = "1";
        })
      }
      checkStateGame(word);
    });
  });
}

/* Диалог с игроком после конца игры */
const endDialogue = (status) => {
  status ? `win` : `lose`;
  let stay = confirm(`You are ${status}! Do you want to start over?`);
    if (stay) {
      document.location.reload();
    }
    else {
      let exit = confirm("Do you want to finish the game?");
      if (exit) {
        window.close();
      }
    }
    return;
}


const initGame = (_groupCellsClass, _cellsClass, word) => {
    generateGame(_groupCellsClass, _cellsClass, word);
    checkAndInsertLetter(word, _cellsClass);
}

const data = await fetch('https://api.npoint.io/e0e7d92aa4c214f6d26c')
  .then((response) => response.json())
  .then((json) => {
    let randomElement = json[Math.floor(Math.random() * json.length)];
    document.querySelector(`.${mainClass}__question`).innerHTML = randomElement.question;
    initGame(groupCellsClass, cellClass, randomElement.answer.toLowerCase());
  });
