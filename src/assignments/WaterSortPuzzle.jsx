import { useState, useEffect } from 'react';
import './WaterSortPuzzle.css';

const COLORS = ['#3b9eff', '#ff4757', '#2ecc71', '#a855f7', '#ff9f43', '#8b5a5a'];
const TUBE_CAPACITY = 4;
const INITIAL_FILL = 3;
const TOTAL_TUBES = 8;

function WaterSortPuzzle() {
  const [tubes, setTubes] = useState([]);

  useEffect(() => {
    initializeGame();
  }, []);

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
  };


  return (
    <div className="game-container">
      <div className="game-card">
        <h1 className="game-title">Water Sort Puzzle</h1>
        <div className="tubes-grid">
          {tubes.map((tube, tubeIndex) => (
            <div 
            key={tubeIndex} 
            className="tube-container">
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