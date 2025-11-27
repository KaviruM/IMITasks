import React, { useState, useEffect } from "react";
import "./WordJumble.css";

const WordJumbleGame = () => {
  const [grid, setGrid] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [gameWords, setGameWords] = useState([]);
  const [score, setScore] = useState(0);
  const [isSelecting, setIsSelecting] = useState(false);

  const WORDS = [
    "HEAT",
    "ROOT",
    "LOOK",
    "FISH",
    "DOOR",
    "CAT",
    "DOG",
    "TREE",
    "BOOK",
    "LOVE",
    "GAME",
    "CODE",
    "PLAY",
    "WORD",
    "JUMP",
    "FAST",
    "SLOW",
    "BLUE",
    "RED",
    "GREEN",
    "STAR",
    "MOON",
    "SUN",
    "WATER",
  ];

  const createEmptyGrid = () => {
    const newGrid = [];
    for (let i = 0; i < 8; i++) {
      newGrid.push(new Array(8).fill(""));
    }
    return newGrid;
  };

  const getRandomLetter = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
  };

  const canPlaceWordHorizontal = (word, grid, row, col) => {
    if (col + word.length > 8) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row][col + i] !== "" && grid[row][col + i] !== word[i]) {
        return false;
      }
    }
    return true;
  };

  const canPlaceWordVertical = (word, grid, row, col) => {
    if (row + word.length > 8) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row + i][col] !== "" && grid[row + i][col] !== word[i]) {
        return false;
      }
    }
    return true;
  };

  const placeWordHorizontal = (word, grid, row, col) => {
    const cells = [];
    for (let i = 0; i < word.length; i++) {
      grid[row][col + i] = word[i];
      cells.push({ x: col + i, y: row });
    }
    return cells;
  };

  const placeWordVertical = (word, grid, row, col) => {
    const cells = [];
    for (let i = 0; i < word.length; i++) {
      grid[row + i][col] = word[i];
      cells.push({ x: col, y: row + i });
    }
    return cells;
  };

  const createPuzzle = () => {
    const newGrid = createEmptyGrid();
    const placedWords = [];
    const wordsToPlace = [...WORDS].slice(0, 8);

    for (let wordIndex = 0; wordIndex < wordsToPlace.length; wordIndex++) {
      const word = wordsToPlace[wordIndex];
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 100) {
        const isHorizontal = Math.random() < 0.5;
        const row = Math.floor(Math.random() * 8);
        const col = Math.floor(Math.random() * 8);

        if (isHorizontal && canPlaceWordHorizontal(word, newGrid, row, col)) {
          const cells = placeWordHorizontal(word, newGrid, row, col);
          placedWords.push({
            word: word,
            cells: cells,
            direction: "horizontal",
          });
          placed = true;
        } else if (
          !isHorizontal &&
          canPlaceWordVertical(word, newGrid, row, col)
        ) {
          const cells = placeWordVertical(word, newGrid, row, col);
          placedWords.push({ word: word, cells: cells, direction: "vertical" });
          placed = true;
        }
        attempts++;
      }
    }

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (newGrid[row][col] === "") {
          newGrid[row][col] = getRandomLetter();
        }
      }
    }

    return { grid: newGrid, words: placedWords };
  };

  const startNewGame = () => {
    const puzzle = createPuzzle();
    setGrid(puzzle.grid);
    setGameWords(puzzle.words);
    setFoundWords([]);
    setScore(0);
    setSelectedCells([]);
    setCurrentPath([]);
    setIsSelecting(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleMouseDown = (x, y) => {
    setIsSelecting(true);
    setCurrentPath([{ x, y }]);
    setSelectedCells([`${x}-${y}`]);
  };

  const handleMouseEnter = (x, y) => {
    if (!isSelecting) return;

    const cellKey = `${x}-${y}`;
    if (selectedCells.includes(cellKey)) return;

    const lastCell = currentPath[currentPath.length - 1];
    const isAdjacent =
      Math.abs(x - lastCell.x) <= 1 && Math.abs(y - lastCell.y) <= 1;

    if (isAdjacent) {
      setCurrentPath([...currentPath, { x, y }]);
      setSelectedCells([...selectedCells, cellKey]);
    }
  };

  const handleMouseUp = () => {
    if (!isSelecting) return;

    if (currentPath.length >= 3) {
      const selectedWord = currentPath
        .map((cell) => grid[cell.y][cell.x])
        .join("");
      const reverseWord = selectedWord.split("").reverse().join("");

      const matchedWord = gameWords.find((wordObj) => {
        const word = wordObj.word;
        const isAlreadyFound = foundWords.some((found) => found.word === word);
        return (
          !isAlreadyFound && (selectedWord === word || reverseWord === word)
        );
      });

      if (matchedWord) {
        setFoundWords([...foundWords, matchedWord]);
        setScore(score + selectedWord.length * 10);
      }
    }

    setIsSelecting(false);
    setCurrentPath([]);
    setSelectedCells([]);
  };

  const isCellFound = (x, y) => {
    return foundWords.some((word) =>
      word.cells.some((cell) => cell.x === x && cell.y === y)
    );
  };

  const isCellSelected = (x, y) => {
    return selectedCells.includes(`${x}-${y}`);
  };

  const getCellClass = (x, y) => {
    let className = "puzzle-cell";
    if (isCellFound(x, y)) className += " found";
    if (isCellSelected(x, y)) className += " selected";
    return className;
  };

  return (
    <div className="word-jumble-container">
      <div className="game-wrapper">
        <div className="game-header">
          <h1 className="game-title">Word Jumble</h1>
          <p className="game-subtitle">Find the hidden words in the grid</p>
          <div className="score-display">Score: {score}</div>
        </div>

        <div className="game-content">
          <div className="puzzle-container">
            <div className="puzzle-grid" onMouseLeave={handleMouseUp}>
              {grid.map((row, y) =>
                row.map((letter, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={getCellClass(x, y)}
                    onMouseDown={() => handleMouseDown(x, y)}
                    onMouseEnter={() => handleMouseEnter(x, y)}
                    onMouseUp={handleMouseUp}
                  >
                    {letter}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="words-panel">
            <h3 className="words-title">Find These Words</h3>
            <div className="words-list">
              {gameWords.map((wordObj, index) => (
                <div
                  key={index}
                  className={`word-item ${
                    foundWords.includes(wordObj) ? "found-word" : ""
                  }`}
                >
                  {wordObj.word}
                </div>
              ))}
            </div>

            <div className="game-stats">
              <div className="stats-text">
                Found: {foundWords.length} / {gameWords.length}
              </div>
              {foundWords.length === gameWords.length && (
                <div className="victory-message">🎉 Congratulations! 🎉</div>
              )}
            </div>
          </div>
        </div>

        <div className="game-controls">
          <button onClick={startNewGame} className="new-game-btn">
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordJumbleGame;
