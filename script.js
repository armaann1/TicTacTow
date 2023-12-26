document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resultContainer = document.querySelector('.result-container');
  
    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];
  
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
  
    function handleCellClick(e) {
      const cellIndex = parseInt(e.target.dataset.index);
      if (boardState[cellIndex] !== '' || !gameActive) return;
  
      boardState[cellIndex] = currentPlayer;
      e.target.innerText = currentPlayer;
  
      checkGameStatus();
      togglePlayer();
    }
  
    function togglePlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.innerText = `Player ${currentPlayer}'s turn`;
    }
  
    function checkGameStatus() {
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (
          boardState[a] &&
          boardState[a] === boardState[b] &&
          boardState[a] === boardState[c]
        ) {
          gameActive = false;
          showGameResult(`Player ${currentPlayer} wins!`);
          return;
        }
      }
  
      if (!boardState.includes('')) {
        gameActive = false;
        showGameResult("It's a tie!");
        return;
      }
    }
  
    function showGameResult(message) {
      resultContainer.style.display = 'block';
      resultContainer.innerHTML = `
        <p>${message}</p>
        <button id="newGameBtn">New Game</button>
      `;
      const newGameBtn = document.getElementById('newGameBtn');
      newGameBtn.addEventListener('click', () => {
        resultContainer.style.display = 'none';
        restartGame();
      });
    }
  
    function restartGame() {
      currentPlayer = 'X';
      gameActive = true;
      boardState = ['', '', '', '', '', '', '', '', ''];
      status.innerText = `Player ${currentPlayer}'s turn`;
  
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
        cell.innerText = '';
      });
    }
  
    function createBoard() {
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
      }
    }
  
    createBoard();
  });
  