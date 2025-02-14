import React, { useState } from 'react';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setScores((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Vencedor: ${winner}`
    : board.every((square) => square)
    ? 'Empate!'
    : `Próximo jogador: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Título */}
      <h1 className="text-3xl font-bold mb-6 text-center">Jogo da Velha</h1>

      {/* Score */}
      <div className="mb-8 text-center">
        <p className="text-xl font-semibold">Pontuação:</p>
        <p className="text-lg">
          Jogador X: <span className="text-blue-600">{scores.X}</span> |{' '}
          Jogador O: <span className="text-red-600">{scores.O}</span>
        </p>
      </div>

      {/* Tabuleiro */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-xs sm:max-w-md md:max-w-lg">
        {board.map((square, index) => (
          <button
            key={index}
            className="w-full aspect-square bg-white border-2 border-gray-300 text-4xl font-bold flex items-center justify-center shadow-md hover:bg-gray-50 transition"
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>

      {/* Status e Botão de Reiniciar */}
      <div className="mt-8 text-center">
        <p className="text-lg font-medium">{status}</p>
        {(winner || board.every((square) => square)) && (
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={resetGame}
          >
            Reiniciar
          </button>
        )}
      </div>
    </div>
  );
}

export default App;