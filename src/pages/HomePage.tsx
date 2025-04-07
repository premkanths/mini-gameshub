import React from 'react';
import GameCard from '../components/GameCard';

export default function HomePage() {
  const games = [
    { id: 'tic-tac-toe', name: 'Tic Tac Toe' },
    { id: 'rock-paper-scissors', name: 'Rock Paper Scissors' },
    { id: 'snake', name: 'Snake Game' },
    { id: 'memory', name: 'Memory Card Game' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Mini Game Hub
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
