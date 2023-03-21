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
  let turn = 1;
  let gameOver = false;

  const getCurrentPlayer = () => {
    return turn % 2 === 1 ? playerOne.sign : playerTwo.sign;
  };

  const playerStep = (index) => {
    GameBoard.setBoard(index, getCurrentPlayer());
    if (turn === 9) {
      resetGame();
      gameOver = true;
      return;
    }
    turn++;
  };

  const getGameOver = () => gameOver;

  const resetGame = () => {
    turn = 1;
    gameOver = false;
  };
  return { playerStep, resetGame, getCurrentPlayer, getGameOver };
})();

const DisplayController = (() => {
  const boardSquares = document.querySelectorAll(".board-square");
  const resetButton = document.querySelector(".reset-board");

  const reset = () => {
    GameController.resetGame();
    GameBoard.resetBoard();
    updateBoard();
  };

  const toggleHover = (square) => {
    square.addEventListener("mouseenter", () => {
      if (!square.classList.contains("hover") && square.innerText === "") {
        square.innerText = GameController.getCurrentPlayer();
        square.classList.add("hover");
      }
    });
    square.addEventListener("mouseleave", () => {
      if (square.classList.contains("hover") && square.innerText !== "") {
        square.innerText = "";
        square.classList.remove("hover");
      }
    });
  };

  const placeSign = (square) => {
    GameController.playerStep(parseInt(square.dataset.square));
    if (GameController.getGameOver()) reset();
    if (square.classList.contains("hover")) {
      square.classList.remove("hover");
    }
    updateBoard();
  };

  const updateBoard = () => {
    for (let i = 0; i < boardSquares.length; i++) {
      boardSquares[i].innerText = GameBoard.getBoard(i);
    }
  };

  boardSquares.forEach((square) => {
    square.addEventListener("click", (e) => {
      if (square.classList.contains("hover")) {
        placeSign(square);
      }
    });
    toggleHover(square);
  });

  resetButton.addEventListener("click", () => {
    reset();
  });
})();
