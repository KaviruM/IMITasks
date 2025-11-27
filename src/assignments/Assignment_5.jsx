import React, { useState } from 'react';

function NumberList() {
  const [numbers, setNumbers] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addNumber = () => {
    if (inputValue !== '') {
      const newNumber = Number(inputValue);
      setNumbers([...numbers, newNumber]);
      setInputValue('');
    }
  };

  const sortAscending = () => {
    setNumbers([...numbers].sort((a, b) => a - b));
  };

  const sortDescending = () => {
    setNumbers([...numbers].sort((a, b) => b - a));
  };

  const moveUp = (index) => {
    if (index > 0) {
      const newNumbers = [...numbers];
      [newNumbers[index], newNumbers[index - 1]] = [newNumbers[index - 1], newNumbers[index]];
      setNumbers(newNumbers);
    }
  };

  const moveDown = (index) => {
    if (index < numbers.length - 1) {
      const newNumbers = [...numbers];
      [newNumbers[index], newNumbers[index + 1]] = [newNumbers[index + 1], newNumbers[index]];
      setNumbers(newNumbers);
    }
  };

  const total = numbers.reduce((sum, num) => sum + num, 0);
  const average = numbers.length > 0 ? total / numbers.length : 0;

  return (
    <div style={{ margin: '20px' }}>
      <h2>Number List</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={sortAscending}
          style={{ padding: '8px 16px', marginRight: '10px' }}
        >
          Sort Ascending
        </button>
        <button 
          onClick={sortDescending}
          style={{ padding: '8px 16px' }}
        >
          Sort Descending
        </button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Total: {total}</label>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Average: {average.toFixed(2)}</label>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {numbers.map((number, index) => (
          <li key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}>
            <span style={{ marginRight: '10px', minWidth: '50px' }}>{number}</span>
            <button 
              onClick={() => moveUp(index)}
              disabled={index === 0}
              style={{ 
                padding: '4px 8px', 
                marginRight: '5px',
                backgroundColor: index === 0 ? '#ccc' : '#007bff',
                color: index === 0 ? '#666' : 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: index === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              Move Up
            </button>
            <button 
              onClick={() => moveDown(index)}
              disabled={index === numbers.length - 1}
              style={{ 
                padding: '4px 8px',
                backgroundColor: index === numbers.length - 1 ? '#ccc' : '#007bff',
                color: index === numbers.length - 1 ? '#666' : 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: index === numbers.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Move Down
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '20px' }}>
        <input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number"
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button 
          onClick={addNumber}
          style={{ padding: '8px 16px' }} >
          Add
        </button>
        <button
          onClick={() => setNumbers([])}
          style={{ padding: '8px 16px', marginLeft: '10px' }}
        >
          Clear
        </button>
        
      </div>
    </div>
  );
}

export default NumberList;