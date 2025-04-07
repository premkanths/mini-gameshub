import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import TicTacToe from './games/TicTacToe';
import RockPaperScissors from './games/RockPaperScissors';
import SnakeGame from './games/SnakeGame';
import MemoryGame from './games/MemoryGame';

type GameComponentType = React.FC<{}>

const gameComponents: { [key: string]: GameComponentType } = {
  'tic-tac-toe': TicTacToe,
  'rock-paper-scissors': RockPaperScissors,
  'snake': SnakeGame,
  'memory': MemoryGame,
};

export default function GameLayout() {
  const { gameId } = useParams<{ gameId: string }>();
  const GameComponent = gameId ? gameComponents[gameId] : null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Games
        </Link>
        
        {GameComponent ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <GameComponent />
          </div>
        ) : (
          <div className="text-center text-red-500">Game not found</div>
        )}
      </div>
    </div>
  );
}
