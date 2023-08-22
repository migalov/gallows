/* HTML-теги */
const template = document.querySelector("#empty-cell");



/* Счетчики игры */
let statusGame = {
  countFalis: 0,
  maxCountFalis: 7,
  countGuessLetter: 0,
  question: "",
  randomWord: "Something"
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
        document.querySelector(windowClass).style = `grid-template-columns: repeat(${word.length}, 1fr)`

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
        console.log("Yes");
      }
      else {
        _e.preventDefault();
        statusGame.countFalis = statusGame.countFalis + 1;
        console.log("No");
        _e.target.classList.add("gallows-cell--error");
        setTimeout(() => {
          _e.target.classList.remove("gallows-cell--error");
        }, 500)
      }
      checkStateGame();
    });
    el.addEventListener("rezise", (_e) => {
      console.log(_e.target.outerWidth);
    })

  });
}

const initGame = (windowClass, cellsClass, word) => {
//   let username = prompt("Hi! Let's game to Gallows. What it's your name?");
//   let start = confirm(`Nice to meet you${username ? ", "+username : ""}! Nice to meet you, Misha. The rules of the game are simple. You must guess the word. You have 7 tries. If you spend all attempts before you give up the word, you lose.
// Good luck.`);
    generateGame(windowClass, word, cellsClass);
    checkAndInsertLetter(word, cellsClass);
}

initGame('.gallows-group-inner', '.gallows-cell', statusGame.randomWord);