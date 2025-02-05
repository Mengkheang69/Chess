const stockfish = new Worker('path/to/stockfish.js');

function sendMove(move) {
    stockfish.postMessage('position fen ' + move);
}

function getBestMove(callback) {
    stockfish.onmessage = function(event) {
        const bestMove = event.data;
        callback(bestMove);
    };
    stockfish.postMessage('go bestmove');
}

function analyzePosition(fen, callback) {
    stockfish.onmessage = function(event) {
        const analysis = event.data;
        callback(analysis);
    };
    stockfish.postMessage('position fen ' + fen);
    stockfish.postMessage('go depth 10');
}

export { sendMove, getBestMove, analyzePosition };