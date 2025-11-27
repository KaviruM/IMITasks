import { useState, useEffect, useRef } from "react";
import "./SnakeGame.css";

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const gridSize = 20;
  const cellSize = 20;

  const [snake, setSnake] = useState([
    { x: 5, y: 10 },
    { x: 4, y: 10 },
    { x: 3, y: 10 },
    { x: 2, y: 10 },
    { x: 1, y: 10 },
    { x: 0, y: 10 },
  ]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp" && direction.y === 0)
        setDirection({ x: 0, y: -1 });
      if (e.key === "ArrowDown" && direction.y === 0)
        setDirection({ x: 0, y: 1 });
      if (e.key === "ArrowLeft" && direction.x === 0)
        setDirection({ x: -1, y: 0 });
      if (e.key === "ArrowRight" && direction.x === 0)
        setDirection({ x: 1, y: 0 });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const gameLoop = setInterval(() => {
      const newHead = {
        x: (snake[0].x + direction.x + gridSize) % gridSize,
        y: (snake[0].y + direction.y + gridSize) % gridSize,
      };

      setSnake([newHead, ...snake.slice(0, -1)]);

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, gridSize * cellSize, gridSize * cellSize);

      ctx.strokeStyle = "#333";
      for (let i = 0; i <= gridSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, gridSize * cellSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(gridSize * cellSize, i * cellSize);
        ctx.stroke();
      }

      ctx.fillStyle = "lime";
      snake.forEach((part) => {
        ctx.fillRect(part.x * cellSize, part.y * cellSize, cellSize, cellSize);
      });
    }, 200);

    return () => clearInterval(gameLoop);
  }, [snake, direction]);

  return (
    <div className="game-container">
      <canvas
        ref={canvasRef}
        width={gridSize * cellSize}
        height={gridSize * cellSize}
        className="game-canvas"
      />
    </div>
  );
}
