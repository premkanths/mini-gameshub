import React, { useState, useEffect } from 'react';

interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Card symbols
  const cardSymbols = ['🚀', '🌟', '🎮', '🎯', '🎲', '🎭', '🎨', '🎪'];

  // Initialize game
  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = [...cardSymbols, ...cardSymbols].map((value, index) => ({
      id: index,
      value,
      flipped: false,
      matched: false,
    }));

    // Shuffle cards
    const shuffledCards = shuffleArray(cardPairs);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
    setGameStarted(true);
  };

  // Shuffle array (Fisher-Yates algorithm)
  const shuffleArray = (array: Card[]): Card[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Handle card click
  const handleCardClick = (id: number) => {
    // Ignore if game is complete or card is already flipped/matched
    const card = cards.find(card => card.id === id);
    if (
      gameComplete ||
      !card ||
      card.flipped ||
      card.matched ||
      flippedCards.length >= 2
    ) {
      return;
    }

    // Flip the card
    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(updatedCards);

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = updatedCards.find(card => card.id === firstId);
      const secondCard = updatedCards.find(card => card.id === secondId);

      if (firstCard?.value === secondCard?.value) {
        // Match found
        setTimeout(() => {
          const matchedCards = updatedCards.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, matched: true }
              : card
          );
          setCards(matchedCards);
          setFlippedCards([]);

          // Check if all cards are matched
          if (matchedCards.every(card => card.matched)) {
            setGameComplete(true);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = updatedCards.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, flipped: false }
              : card
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Memory Card Game</h2>

      {!gameStarted ? (
        <div className="text-center mb-6">
          <p className="mb-4">Match pairs of cards with the same symbol</p>
          <button
            onClick={initializeGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between w-full max-w-md">
            <p className="text-lg">Moves: {moves}</p>
            <button
              onClick={initializeGame}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
            >
              Restart
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 w-full max-w-md">
            {cards.map(card => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer text-3xl transition-all duration-300 transform ${
                  card.flipped || card.matched
                    ? 'bg-white rotate-y-0'
                    : 'bg-blue-500 rotate-y-180'
                } ${
                  card.matched ? 'bg-green-100' : ''
                }`}
                style={{ 
                  perspective: '1000px',
                  height: '70px'
                }}
              >
                {(card.flipped || card.matched) && card.value}
              </div>
            ))}
          </div>

          {gameComplete && (
            <div className="mt-6 text-center">
              <p className="text-xl font-bold text-green-600 mb-2">
                Congratulations!
              </p>
              <p className="mb-4">You completed the game in {moves} moves</p>
              <button
                onClick={initializeGame}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
