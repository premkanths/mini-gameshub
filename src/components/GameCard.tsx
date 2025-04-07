import React from 'react';
import { Link } from 'react-router-dom';

interface GameProps {
  game: {
    id: string;
    name: string;
  };
}

export default function GameCard({ game }: GameProps) {
  return (
    <Link 
      to={`/game/${game.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{game.name}</h2>
        <p className="text-gray-600">Click to play</p>
      </div>
    </Link>
  );
}
