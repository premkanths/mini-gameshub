import React, { useState } from 'react';

type Square = 'X' | 'O' | null;

export default function TicTacToe() {
  const [squares, setSquares] = useState<Square[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares: Square[]): Square => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) return;
    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="text-xl font-bold mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-2 w-64">
        {squares.map((square, i) => (
          <button
            key={i}
            className="h-20 text-3xl font-bold bg-gray-100 hover:bg-gray-200"
            onClick={() => handleClick(i)}
          >
            {square}
          </button>
        ))}
      </div>
    </div>
  );
}
