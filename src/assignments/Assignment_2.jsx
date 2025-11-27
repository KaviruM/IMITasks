import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Calculator() {
  const [operation, setOperation] = useState('addition');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const calculate = () => {
    const number1 = Number(num1);
    const number2 = Number(num2);
    
    if (operation === 'addition') {
      setResult(number1 + number2);
    } else if (operation === 'subtraction') {
      setResult(number1 - number2);
    } else if (operation === 'multiplication') {
      setResult(number1 * number2);
    } else if (operation === 'division') {
      setResult(number1 / number2);
    }
  };


  const showButton = num1 !== '' && num2 !== '';

  return (

    <div style={{ margin: '10px' }}>


        <Link to="/">
            <button style={{ padding: '10px', margin: '5px' }}> Back to Home </button>
        </Link>


      <h2>Calculator</h2>
      

      <div style={{ margin: '10px' }}>
        
        <label>Operation: </label>
        <select 
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="addition">Addition</option>
          <option value="subtraction">Subtraction</option>
          <option value="multiplication">Multiplication</option>
          <option value="division">Division</option>
        </select>

      </div>

      <div style={{ margin: '10px' }}>

        <label>First Number: </label>
        <input 
          type="number" 
          value={num1} 
          onChange={(e) => setNum1(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px' }}
        />

      </div>

      <div style={{ margin: '10px' }}>

        <label>Second Number: </label>
        <input 
          type="number" 
          value={num2} 
          onChange={(e) => setNum2(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px' }}
        />

      </div>

      {showButton && (

        <button onClick={calculate} style={{ padding: '10px', margin: '5px' }}>
          Calculate
        </button>
        
      )}

      {showButton && result !== '' && (
        <div style={{ margin: '10px' }}>
          <h3>Result: {result}</h3>
        </div>
      )}
    </div>
  );
}

export default Calculator;