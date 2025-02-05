const Chessboard = require('./chessboard');
const Stockfish = require('./stockfish');

const chessboard = new Chessboard('chessboard-container');
let stockfish;

function init() {
    stockfish = Stockfish();
    chessboard.init();
    setupEventListeners();
}

function setupEventListeners() {
    chessboard.onMove = (move) => {
        stockfish.postMessage(`position fen ${chessboard.getFEN()}`);
        stockfish.postMessage(`go movetime 1000`);
    };

    stockfish.onmessage = (event) => {
        const bestMove = event.data;
        chessboard.updateBoard(bestMove);
    };
}

document.addEventListener('DOMContentLoaded', init);