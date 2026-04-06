let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

let xScore = 0;
let oScore = 0;

const status = document.getElementById("status");
const boardDiv = document.getElementById("board");

// Create board UI
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = i;
    cell.addEventListener("click", handleClick);
    boardDiv.appendChild(cell);
}

function handleClick(e) {
    const id = e.target.id;

    if (board[id] !== "" || !gameActive) return;

    board[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (checkWinner()) {
        status.innerText = `${currentPlayer} Wins! 🎉`;
        updateScore();
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        status.innerText = "Draw 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = "O";

    setTimeout(aiMove, 500);
}

function aiMove() {
    let empty = board
        .map((v, i) => v === "" ? i : null)
        .filter(v => v !== null);

    let move = empty[Math.floor(Math.random() * empty.length)];

    board[move] = "O";
    document.getElementById(move).innerText = "O";

    if (checkWinner()) {
        status.innerText = `O Wins! 🤖`;
        updateScore();
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        status.innerText = "Draw 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = "X";
}

function checkWinner() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(i => board[i] === currentPlayer);
    });
}

function updateScore() {
    if (currentPlayer === "X") {
        xScore++;
        document.getElementById("xScore").innerText = xScore;
    } else {
        oScore++;
        document.getElementById("oScore").innerText = oScore;
    }
}

function restartGame() {
    board = Array(9).fill("");
    gameActive = true;
    currentPlayer = "X";
    status.innerText = "";

    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
    });
}