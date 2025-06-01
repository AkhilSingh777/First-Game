const boxes = document.querySelectorAll('.box');
const winConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];
let turnO = true, gameActive = true;
let nextFirstTurnO = true;

// Disable all boxes initially
boxes.forEach(b => b.disabled = true);

// Helper to show winner popup
function showWinnerPopup(message) {
    const popup = document.getElementById('winner-popup');
    const msg = document.getElementById('winner-message');
    if (popup && msg) {
        msg.textContent = message;
        popup.style.display = 'flex';
    }
}

// Hide popup when starting a new game
function hideWinnerPopup() {
    const popup = document.getElementById('winner-popup');
    if (popup) popup.style.display = 'none';
}

// Function to reset the game board
function resetBoard() {
  boxes.forEach(b => {
    b.classList.remove('o','x','active');
    b.innerText = '';
    b.disabled = false; // Enable boxes on reset/start
  });
  gameActive = true;
  turnO = nextFirstTurnO;
  // Alternate for next game
  nextFirstTurnO = !nextFirstTurnO;
  hideWinnerPopup();
}

// Function to reset the game
function resetGame() {
    resetBoard();
}

function startGame() {
    resetBoard();
}

function checkWinner() {
  const curr = turnO ? 'O' : 'X';
  const currClass = curr.toLowerCase();
  for (let cond of winConditions)
    if (cond.every(i => boxes[i].classList.contains(currClass))) {
      gameActive = false;
      setTimeout(() => {
        showWinnerPopup(`${curr} wins!`);
      }, 100);
      return true;
    }

  // Check for draw
  if ([...boxes].every(b => b.classList.contains('o') || b.classList.contains('x'))) {
    gameActive = false;
    setTimeout(() => {
      showWinnerPopup("It's a draw!");
    }, 100);
    return true;
  }
  return false;
}

// Check for Winner and handle box clicks
boxes.forEach(box => {
  box.addEventListener('click', () => {
    if (!gameActive || box.classList.contains('o') || box.classList.contains('x') || box.disabled) return;
    box.classList.add(turnO ? 'o' : 'x');
    box.innerText = turnO ? 'O' : 'X';
    if (!checkWinner()) {
      turnO = !turnO;
    }
  });
});

document.querySelector('.reset-btn')?.addEventListener('click', function() {
    resetGame();
});