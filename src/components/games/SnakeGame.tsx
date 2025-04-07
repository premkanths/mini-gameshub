import React, { useState, useEffect, useRef } from 'react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [speed, setSpeed] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  // Game board settings
  const gridSize = 20;
  const canvasSize = 300;
  const cellSize = canvasSize / gridSize;

  // Generate random food position
  const generateFood = (): Position => {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    return { x, y };
  };

  // Check if position is occupied by snake
  const isPositionOccupied = (pos: Position): boolean => {
    return snake.some(segment => segment.x === pos.x && segment.y === pos.y);
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(!isPaused);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isPaused]);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      const head = { ...snake[0] };

      // Move head based on direction
      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check for collisions
      if (
        head.x < 0 ||
        head.x >= gridSize ||
        head.y < 0 ||
        head.y >= gridSize ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        return;
      }

      // Check if snake eats food
      const newSnake = [head, ...snake];
      if (head.x === food.x && head.y === food.y) {
        setScore(score + 1);
        let newFood = generateFood();
        while (isPositionOccupied(newFood)) {
          newFood = generateFood();
        }
        setFood(newFood);
        
        // Increase speed slightly
        if (speed > 50) {
          setSpeed(prevSpeed => prevSpeed - 2);
        }
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [snake, food, direction, gameOver, isPaused, score, speed]);

  // Draw game
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw snake
    ctx.fillStyle = '#4CAF50';
    snake.forEach(segment => {
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize,
        cellSize
      );
    });

    // Draw food
    ctx.fillStyle = '#FF5722';
    ctx.fillRect(
      food.x * cellSize,
      food.y * cellSize,
      cellSize,
      cellSize
    );

    // Draw grid (optional)
    ctx.strokeStyle = '#E0E0E0';
    for (let i = 0; i < gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvasSize);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvasSize, i * cellSize);
      ctx.stroke();
    }
  }, [snake, food, cellSize]);

  // Reset game
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(100);
    setIsPaused(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Snake Game</h2>
      <div className="mb-4">
        <p className="text-lg">Score: {score}</p>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className="border-2 border-gray-300"
        />
        
        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
            <p className="text-white text-2xl font-bold mb-4">Game Over!</p>
            <p className="text-white text-xl mb-4">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Play Again
            </button>
          </div>
        )}

        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <p className="text-white text-2xl font-bold">Paused</p>
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 mb-2">Use arrow keys to move</p>
        <p className="text-sm text-gray-600">Press spacebar to pause</p>
        
        <div className="mt-4 grid grid-cols-3 gap-2 w-32 mx-auto">
          <div></div>
          <button 
            onClick={() => direction !== 'DOWN' && setDirection('UP')}
            className="p-2 bg-gray-200 rounded"
          >
            ↑
          </button>
          <div></div>
          
          <button 
            onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
            className="p-2 bg-gray-200 rounded"
          >
            ←
          </button>
          
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 bg-gray-200 rounded"
          >
            ⏯️
          </button>
          
          <button 
            onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
            className="p-2 bg-gray-200 rounded"
          >
            →
          </button>
          
          <div></div>
          <button 
            onClick={() => direction !== 'UP' && setDirection('DOWN')}
            className="p-2 bg-gray-200 rounded"
          >
            ↓
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
}
