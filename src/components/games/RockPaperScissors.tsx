import React, { useState } from 'react';

type Choice = 'rock' | 'paper' | 'scissors' | null;

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<string>('');

  const choices: Choice[] = ['rock', 'paper', 'scissors'];

  const determineWinner = (player: Choice, computer: Choice) => {
    if (!player || !computer) return '';
    
    if (player === computer) return 'Tie Game!';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) return 'You Win!';
    
    return 'Computer Wins!';
  };

  const handlePlay = (choice: Choice) => {
    const computer = choices[Math.floor(Math.random() * 3)];
    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(determineWinner(choice, computer));
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-8">Rock Paper Scissors</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        {choices.map((choice) => (
          <button
            key={choice}
            className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200 uppercase font-medium"
            onClick={() => handlePlay(choice)}
          >
            {choice}
          </button>
        ))}
      </div>

      {playerChoice && computerChoice && (
        <div className="space-y-4">
          <div className="text-lg">
            You chose: <span className="font-bold">{playerChoice}</span>
          </div>
          <div className="text-lg">
            Computer chose: <span className="font-bold">{computerChoice}</span>
          </div>
          <div className="text-xl font-bold text-blue-600">{result}</div>
        </div>
      )}
    </div>
  );
}
