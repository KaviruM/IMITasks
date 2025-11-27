import React, { useState, useEffect } from "react";
import "./Assignment_18.css";

export default function ColorClickingGame() {
  const [colors, setColors] = useState(["red"]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      const randomFloat = Math.random();
      const newColor = randomFloat < 0.5 ? "blue" : "red";

      setColors((prevColors) => {
        const newColors = [...prevColors];
        newColors.unshift(newColor);

        if (newColors.length > 6) {
          setGameOver(true);
        }

        return newColors;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  const handleColorClick = (clickedColor) => {
    if (gameOver) return;

    const lastColor = colors[colors.length - 1];

    if (clickedColor === lastColor) {
      setColors((prevColors) => prevColors.slice(0, -1));
      setScore((prevScore) => prevScore + 1);
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setColors(["red"]);
    setScore(0);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="game-container">
        <div className="game-over-card">
          <h1 className="game-over-title">Game Over!</h1>
          <p className="final-score">
            Final Score: <span className="score-highlight">{score}</span>
          </p>
          <p className="game-over-message">
            {colors.length > 6
              ? "The color array got too long!"
              : "You clicked the wrong color!"}
          </p>
          <button onClick={resetGame} className="play-again-btn">
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-card">
        <div className="header">
          <h1 className="game-title">Color Clicking Game</h1>
          <p className="score-display">
            Score: <span className="score-value">{score}</span>
          </p>
          <p className="instructions">
            Click the button that matches the last (rightmost) color!
          </p>
        </div>

        <div className="colors-container">
          <div className="colors-display">
            {colors.length === 0 ? (
              <div className="no-colors">No colors</div>
            ) : (
              colors.map((color, index) => (
                <div
                  key={index}
                  className={`color-box ${color} ${
                    index === colors.length - 1 ? "last-color" : ""
                  }`}
                  title={`Position ${index + 1}: ${color}`}
                />
              ))
            )}
          </div>
        </div>

        <div className="buttons-container">
          <button
            onClick={() => handleColorClick("red")}
            className="color-btn red-btn"
            disabled={colors.length === 0}
          >
            RED
          </button>
          <button
            onClick={() => handleColorClick("blue")}
            className="color-btn blue-btn"
            disabled={colors.length === 0}
          >
            BLUE
          </button>
        </div>

        <div className="game-info">
          <p>Array length: {colors.length}/6</p>
          <p>
            New colors appear every second. Game ends if array reaches 7 items
            or you click wrong!
          </p>
        </div>
      </div>
    </div>
  );
}
