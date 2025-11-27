import React, { useState, useEffect } from "react";
import "./BladeHit.css";

const BladeHit = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [knives, setKnives] = useState([]);
  const [direction, setDirection] = useState(1);

  const SPEED = 1.5;
  const SAFE_DISTANCE = 15;

  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setRotation((prev) => (prev + direction * SPEED) % 360);
    }, 16);

    return () => clearInterval(timer);
  }, [direction, gameOver]);

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setRotation(0);
    setKnives([]);
    setDirection(1);
  };



  const throwKnife = () => {
    if (gameOver) return;

    const currentPosition = ((-rotation % 360) + 360) % 360;

    const hitExistingKnife = knives.some((knifePosition) => {
      const distance = Math.abs(knifePosition - currentPosition);
      const shortestDistance = Math.min(distance, 360 - distance);
      return shortestDistance < SAFE_DISTANCE;
    });

    if (hitExistingKnife) {
      setGameOver(true);
      setTimeout(resetGame, 1000);
    } else {
      setKnives((prev) => [...prev, currentPosition]);
      setScore((prev) => prev + 1);
      setDirection((prev) => prev * -1);
    }
  };


  
  return (
    <div className="game-container">
      <div className="score-display">Score: {score}</div>

      <div className="arrow-down">↓</div>

      <div className="game-area">
        <div
          className="dartboard"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {knives.map((knifeRotation, index) => (
            <div
              key={index}
              className="knife"
              style={{
                transform: `translateX(-50%) rotate(${knifeRotation}deg)`,
              }}
            />
          ))}
          <div className="center-dot" />
        </div>
      </div>

      <button
        onClick={throwKnife}
        disabled={gameOver}
        className={`throw-button ${gameOver ? "disabled" : ""}`}
      >
        {gameOver ? "GAME OVER" : "THROW KNIFE"}
      </button>
    </div>
  );
};

export default BladeHit;
