const GameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = (index) => {
    if (index > board.length) return;
    return board[index];
  };

  const setBoard = (index, sign) => {
    if (index > board.length) return;
    board[index] = sign;
    console.log(board);
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };
  return { getBoard, setBoard, resetBoard };
})();

const Player = (sign, turn) => {
  return { sign, turn };
};

const GameController = (() => {
  const playerOne = Player("X", true);
  const playerTwo = Player("O", false);
  const board = GameBoard.getBoard();
  let turn = 1;

  const getCurrentPlayer = () => {
    return turn % 2 === 1 ? playerOne.sign : playerTwo.sign;
  };

  const playerStep = (index) => {
    GameBoard.setBoard(index, getCurrentPlayer());
    if (turn === 9) {
      resetGame();
      return;
    }
    turn++;
  };

  const resetGame = () => {
    turn = 1;
  };
  return { playerStep, resetGame };
})();

const DisplayController = (() => {
  const boardSquares = document.querySelectorAll(".board-square");
  const resetButton = document.querySelector(".reset-board");

  boardSquares.forEach((square) => {
    square.addEventListener("click", (e) => {
      GameController.playerStep(parseInt(e.target.dataset.square));
      updateBoard();
    });
  });

  resetButton.addEventListener("click", () => {
    GameBoard.resetBoard();
    GameController.resetGame();
    updateBoard();
  });

  const updateBoard = () => {
    for (let i = 0; i < boardSquares.length; i++) {
      boardSquares[i].innerText = GameBoard.getBoard(i);
    }
  };
})();
console.log("joe");
