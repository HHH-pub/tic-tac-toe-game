import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const statusDisplay = document.getElementById('game-status');
  const gameBoard = document.getElementById('game-board');
  const restartButton = document.getElementById('restart-button');
  const cells = document.querySelectorAll('.cell');

  let gameActive = true;
  let currentPlayer = 'X';
  let gameState = ["", "", "", "", "", "", "", "", ""];

  const winningMessage = () => `Player ${currentPlayer} has won!`;
  const drawMessage = () => `Game ended in a draw!`;
  const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
  }

  function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = currentPlayerTurn();
  }

  function handleResultValidation() {
    let roundWon = false;
    let winningCombo = [];

    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = gameState[winCondition[0]];
      const b = gameState[winCondition[1]];
      const c = gameState[winCondition[2]];
      if (a === '' || b === '' || c === '') {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        winningCombo = winCondition;
        break;
      }
    }

    if (roundWon) {
      statusDisplay.innerHTML = winningMessage();
      gameActive = false;
      winningCombo.forEach(index => {
        cells[index].classList.add('win');
      });
      return;
    }

    const roundDraw = !gameState.includes("");
    if (roundDraw) {
      statusDisplay.innerHTML = drawMessage();
      gameActive = false;
      return;
    }

    handlePlayerChange();
  }

  function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }

  function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    cells.forEach(cell => {
      cell.innerHTML = "";
      cell.classList.remove('x', 'o', 'win');
    });
  }

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  restartButton.addEventListener('click', handleRestartGame);

  // Initial setup
  statusDisplay.innerHTML = currentPlayerTurn();
});
