import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const total = numbers.reduce((sum, num) => sum + num, 0);
  const average = numbers.length > 0 ? total / numbers.length : 0;

  return (
    <div style={{ margin: '20px' }}>

        <Link to="/">
            <button style={{ padding: '10px', marginBottom: '20px' }}> Back to Home </button>
        </Link>
        
      <h2>Number List</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Total: {total}</label>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Average: {average.toFixed(2)}</label>
      </div>

      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
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
          style={{ padding: '8px 16px' }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default NumberList;