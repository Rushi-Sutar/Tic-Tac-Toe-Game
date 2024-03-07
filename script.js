let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;

function handleCellClick(event) {
    const clickedCell = event.target;
    if (clickedCell.textContent !== '') return;

    clickedCell.textContent = currentPlayer;
    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        disableBoard();
    } else if (checkDraw()) {
        statusDisplay.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a].textContent !== '' &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent;
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function resetBoard() {
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    enableBoard();
}

function disableBoard() {
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function enableBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
}
