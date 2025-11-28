import React, { useMemo, useState } from 'react';
import './App.css';

/**
 * Utility: all winning line indices for a 3x3 board.
 */
const LINES = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6],
];

/**
 * PUBLIC_INTERFACE
 * calculateWinner
 * Determines the winner of a given board, returning
 * - 'X' or 'O' if there is a winner,
 * - null otherwise.
 */
export function calculateWinner(squares) {
  /** Determine winner given current board. */
  for (const [a, b, c] of LINES) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * isDraw
 * Returns true when the board is full and there is no winner.
 */
export function isDraw(squares) {
  /** Check if all cells are filled and no winner exists. */
  return squares.every(Boolean) && !calculateWinner(squares);
}

/**
 * Square component - a simple button cell.
 * Accessible with aria-label and disabled when game ends or filled.
 */
function Square({ value, onClick, isWinning, disabled, index }) {
  const symbol = value || '';
  return (
    <button
      type="button"
      className={`ttt-square${isWinning ? ' ttt-square--win' : ''}${symbol ? ' ttt-square--filled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Cell ${index + 1}${symbol ? `, ${symbol}` : ', empty'}`}
    >
      <span className={`ttt-square__symbol ${symbol === 'X' ? 'ttt-square__x' : symbol === 'O' ? 'ttt-square__o' : ''}`}>
        {symbol}
      </span>
    </button>
  );
}

/**
 * Board component renders a 3x3 grid.
 */
function Board({ squares, onSquareClick, winningLine, gameOver }) {
  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((sq, i) => {
        const isWinning = winningLine?.includes(i);
        return (
          <Square
            key={i}
            value={sq}
            onClick={() => onSquareClick(i)}
            isWinning={isWinning}
            disabled={gameOver || Boolean(sq)}
            index={i}
          />
        );
      })}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * App
 * A modern, responsive Tic Tac Toe game with Ocean Professional theme.
 * Includes:
 * - 3x3 board
 * - Turn management
 * - Win/draw detection
 * - Reset/New Game controls
 * - Accessible labels and keyboard focusable controls
 */
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const hasDrawn = useMemo(() => isDraw(squares), [squares]);
  const gameOver = Boolean(winner) || hasDrawn;

  const winningLine = useMemo(() => {
    if (!winner) return null;
    for (const line of LINES) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return line;
      }
    }
    return null;
  }, [winner, squares]);

  const statusText = winner
    ? `Winner: ${winner}`
    : hasDrawn
    ? 'Draw'
    : `Next Player: ${xIsNext ? 'X' : 'O'}`;

  const handleSquareClick = (i) => {
    if (squares[i] || gameOver) return;
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    /** Reset board, keep X starting. */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // PUBLIC_INTERFACE
  const newGame = () => {
    /** Start a new game alternating the starting player. */
    setSquares(Array(9).fill(null));
    setXIsNext((prev) => !prev);
  };

  return (
    <div className="ocean-app">
      <main className="ocean-container">
        <header className="ocean-header">
          <h1 className="ocean-title">Tic Tac Toe</h1>
          <p className="ocean-subtitle">Ocean Professional</p>
        </header>

        <section
          className="ocean-surface"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="status-row">
            <div
              className={`status-badge ${
                winner ? 'status-badge--success' : hasDrawn ? 'status-badge--neutral' : 'status-badge--info'
              }`}
            >
              {statusText}
            </div>
            <div className="turn-indicator" aria-hidden={!!winner || hasDrawn}>
              <span className={`dot ${xIsNext ? 'dot--x' : 'dot--o'}`} />
              <span className="turn-text">{xIsNext ? 'X' : 'O'}</span>
            </div>
          </div>

          <Board
            squares={squares}
            onSquareClick={handleSquareClick}
            winningLine={winningLine}
            gameOver={gameOver}
          />

          <div className="controls">
            <button
              type="button"
              className="btn btn-primary"
              onClick={resetGame}
              aria-label="Reset game with X starting"
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={newGame}
              aria-label="Start a new game alternating starting player"
            >
              New Game
            </button>
          </div>
        </section>

        <footer className="ocean-footer">
          <small className="env-hint">
            {process.env.REACT_APP_FRONTEND_URL
              ? `Base: ${process.env.REACT_APP_FRONTEND_URL}`
              : 'Local play'}
          </small>
        </footer>
      </main>
    </div>
  );
}

export default App;
