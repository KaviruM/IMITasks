import { useState, useEffect } from 'react';
import './WaterSortPuzzle.css';

const COLORS = ['#3b9eff', '#ff4757', '#2ecc71', '#a855f7', '#ff9f43', '#8b5a5a'];
const TUBE_CAPACITY = 4;
const INITIAL_FILL = 3;
const TOTAL_TUBES = 8;

function WaterSortPuzzle() {
  const [tubes, setTubes] = useState([]);
  const [selectedTube, setSelectedTube] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    checkWinCondition();
  }, [tubes]);

  const initializeGame = () => {
    const coloredTubes = [];
    
    const colorPool = [];
    COLORS.forEach(color => {
      for (let i = 0; i < 4; i++) {
        colorPool.push(color);
      }
    });
    
    const shuffled = colorPool.sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < TOTAL_TUBES; i++) {
      const tube = [];
      for (let j = 0; j < INITIAL_FILL; j++) {
        tube.push(shuffled[i * INITIAL_FILL + j]);
      }
      coloredTubes.push(tube);
    }

    setTubes(coloredTubes);
    setSelectedTube(null);
    setIsComplete(false);
  };

  const getTopColor = (tube) => {
    if (tube.length === 0) return null;
    return tube[tube.length - 1];
  };

  const canTransfer = (fromTube, toTube) => {
    if (fromTube.length === 0) return false;
    
    if (toTube.length >= TUBE_CAPACITY) return false;
    
    if (toTube.length === 0) return true;
    
    const fromColor = getTopColor(fromTube);
    const toColor = getTopColor(toTube);
    return fromColor === toColor;
  };

  const transferWater = (fromIndex, toIndex) => {
    const newTubes = tubes.map(tube => [...tube]);
    const fromTube = newTubes[fromIndex];
    const toTube = newTubes[toIndex];

    if (!canTransfer(fromTube, toTube)) return false;

    const colorToTransfer = fromTube[fromTube.length - 1];
    
    while (
      fromTube.length > 0 && 
      fromTube[fromTube.length - 1] === colorToTransfer &&
      toTube.length < TUBE_CAPACITY
    ) {
      const color = fromTube.pop();
      toTube.push(color);
    }

    setTubes(newTubes);
    return true;
  };

  const handleTubeClick = (tubeIndex) => {
    if (isComplete) return;

    if (selectedTube === null) {
      if (tubes[tubeIndex].length > 0) {
        setSelectedTube(tubeIndex);
      }
      return;
    }

    if (selectedTube === tubeIndex) {
      setSelectedTube(null);
      return;
    }

    const success = transferWater(selectedTube, tubeIndex);
    
    setSelectedTube(null);
  };

  const checkWinCondition = () => {
    if (tubes.length === 0) return;

    const isWon = tubes.every(tube => {
      if (tube.length === 0) return true;
      if (tube.length !== TUBE_CAPACITY) return false;
      
      const firstColor = tube[0];
      return tube.every(color => color === firstColor);
    });

    setIsComplete(isWon);
  };

  return (
    <div className="game-container">
      <div className="game-card">
        <h1 className="game-title">Water Sort Puzzle</h1>
        
        {isComplete && (
          <div className="win-message">
            Congratulations! You solved the puzzle!
          </div>
        )}

        <div className="tubes-grid">
          {tubes.map((tube, tubeIndex) => (
            <div 
              key={tubeIndex} 
              className={`tube-container ${selectedTube === tubeIndex ? 'selected' : ''}`}
              onClick={() => handleTubeClick(tubeIndex)}>
              <div className="tube-top" />              
              <div className="tube-body">
                <div className="water-layers">
                  {tube.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="water-layer"
                      style={{ backgroundColor: color }}/>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={initializeGame} className="reset-button">
          Reset Game
        </button>

      </div>
    </div>
  );
}

export default WaterSortPuzzle;