/* HTML-теги */
const template = document.querySelector("#empty-cell");

/* Счетчики игры */
let statusGame = {
  countFalis: 0,
  maxCountFalis: 7,
  countGuessLetter: 0,
  randomWord: "Some"
}

/* Проверка состояния игры */
const checkStateGame = () => {
  if(statusGame.countFalis < statusGame.maxCountFalis) {
    console.log("Let's continue");
  }
  else {
    console.log("You lose");
    return;
  }
  if(statusGame.countGuessLetter === statusGame.randomWord.length) {
    console.log("You win");
  }
  console.log(statusGame);
}

/* Генерируем поля для вставки букв */
const generateGame = (windowClass, word, cellsClass) => {

  for(let i = 0; i < word.length; i++) {

    let clone = template.content.cloneNode(true),
        cell = clone.querySelector(cellsClass);
        cell.dataset.index = i;

        document.querySelector(windowClass).appendChild(cell);

  }
}

/* Проверяем букву и вставляем */
const checkAndInsertLetter = (word, selector) => {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener("keypress", (_e) => {
      if (_e.target.dataset.index == word.indexOf(_e.key)) {
        _e.target.value = _e.key;
        _e.target.disabled = true;
        statusGame.countGuessLetter = statusGame.countGuessLetter + 1;
      }
      else {
        _e.preventDefault();
        statusGame.countFalis = statusGame.countFalis + 1;
      }
      checkStateGame();
    });

  });
}

const initGame = (windowClass, cellsClass, word) => {
  generateGame(windowClass, word, cellsClass);
  checkAndInsertLetter(word, cellsClass);
}

initGame('.gallows', '.gallows-cell', statusGame.randomWord);