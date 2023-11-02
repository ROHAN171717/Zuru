const items = Array.from(document.querySelectorAll(".item"));
const playerDisplay = document.querySelector(".display-player");
const resetButton = document.querySelector(".reset-button");
const announcer = document.querySelector(".announcer");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

/*
   Indexes within the board
   [0] [1] [2]
   [3] [4] [5]
   [6] [7] [8]
*/

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const isValidAction = (item) => {
  if (item.innerText === "X" || item.innerText === "0") {
    return false;
  }
  return true;
};

const updateBoard = (index) => {
  board[index] = currentPlayer;
};

const changePlayer = () => {
  playerDisplay.classList.remove(`player${currentPlayer}`);
  currentPlayer = currentPlayer === "X" ? "0" : "X";
  playerDisplay.innerText = currentPlayer;
  playerDisplay.classList.add(`player${currentPlayer}`);
};

const announce = (type) => {
  switch (type) {
    case "PLAYER0_WON":
      announcer.innerHTML = 'Player <span class="player0">0</span> Won';
      break;
    case "PLAYERX_WON":
      announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
      break;
    default:
      announcer.innerHTML = "Tie";
  }
  announcer.classList.remove("hide");
  // playerDisplay.parentElement.classList.add('hide');
  document.getElementsByClassName("turn")[0].classList.add("hide");
};

function handleResultValidation(index) {
  let roundWon = false;

  let filteredWinningCondition = winningConditions.filter((item) =>item.includes(index));

  for (let i = 0; i < filteredWinningCondition.length; i++) {
    const winCondition = filteredWinningCondition[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
    }
    
  if (roundWon) {
    announce(currentPlayer === "X" ? "PLAYERX_WON" : "PLAYER0_WON");
    isGameActive = false;
    return;
  }
  if (!board.includes("")) {
    announce("TIE");
  }
}

const userAction = (item, index) => {
  if (isValidAction(item) && isGameActive) {
    item.innerText = currentPlayer;
    item.classList.add(`player${currentPlayer}`);
    updateBoard(index);
    handleResultValidation(index);
    changePlayer();
  }
};

items.forEach((item, index) => {
  item.addEventListener("click", () => userAction(item, index));
});

const resetBoard = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  announcer.classList.add("hide");

  if (currentPlayer === "0") {
    changePlayer();
  }
  playerDisplay.parentElement.classList.remove("hide");

  items.forEach((item) => {
    item.innerText = "";
    item.classList.remove("playerX");
    item.classList.remove("player0");
  });
};

resetButton.addEventListener("click", resetBoard);
