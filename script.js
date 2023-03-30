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

const Player = (sign, turn, won) => {
  return { sign, turn, won };
};

const GameController = (() => {
  const playerOne = Player("X", true, false);
  const playerTwo = Player("O", false, false);
  let turn = 1;
  let gameOver = false;

  const checkWin = (index) => {
    let winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const winner = winConditions
      .filter((combinations) => combinations.includes(index))
      .some((combination) =>
        combination.every(
          (square) => GameBoard.getBoard(square) == getCurrentPlayer()
        )
      );
    return winner;
  };

  const getCurrentPlayer = () => {
    return turn % 2 === 1 ? playerOne.sign : playerTwo.sign;
  };

  const playerStep = (index) => {
    GameBoard.setBoard(index, getCurrentPlayer());
    if (checkWin(index)) {
      gameOver = true;
      DisplayController.displayWinner(getCurrentPlayer());
      return;
    }
    if (turn === 9) {
      resetGame();
      gameOver = true;
      DisplayController.displayDraw();
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
//

const DisplayController = (() => {
  const boardSquares = document.querySelectorAll(".board-square");
  const resetButton = document.querySelector(".reset-board");
  const turn = document.getElementById("turn");
  const winnerDisplay = document.getElementById("winner");

  const reset = () => {
    GameController.resetGame();
    GameBoard.resetBoard();
    updateBoard();
  };

  const displayTurn = () => {
    turn.innerText = GameController.getCurrentPlayer();
  };

  const displayWinner = () => {
    winnerDisplay.innerText = `${GameController.getCurrentPlayer()} Wins!`;
  };

  const displayDraw = () => {
    winnerDisplay.innerText = "Draw";
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

  const playerStep = (square) => {
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
    square.addEventListener("click", () => {
      if (square.classList.contains("hover")) {
        playerStep(square);
        displayTurn();
      }
    });
    toggleHover(square);
  });

  resetButton.addEventListener("click", () => {
    reset();
    winnerDisplay.innerText = "";
  });

  return { displayWinner, displayDraw };
})();
