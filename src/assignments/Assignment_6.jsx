import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Assignment_6() {
    const [style, setStyle] = useState([]);
    const [inputCSSName, setCSSName] = useState('');
    const [inputCSSValue, setCSSValue] = useState('');
    const [appliedStyles, setAppliedStyles] = useState({});


    const addStyle = () => {
        if (inputCSSName !== '' && inputCSSValue !== '') {
            const newStyle = { name: inputCSSName, value: inputCSSValue };
            setStyle([...style, newStyle]);
            setCSSName('');
            setCSSValue('');
        }
    };

    
    const removeStyle = (index) => {
        const newStyle = [...style];
        newStyle.splice(index, 1);
        setStyle(newStyle);
    };


    const applyStyles = () => {
        const styleObject = {};
        style.forEach(s => {
            // Convert CSS property names to camelCase for React
            const camelCaseName = s.name.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
            styleObject[camelCaseName] = s.value;
        });
        setAppliedStyles(styleObject);
    };

    
    return (
        <div style={{ margin: '20px' }}>
            <Link to="/">
                <button style={{ padding: '10px', marginBottom: '20px' }}>
                    Back to Home
                </button>   
            </Link>
            <h2>Dynamic Style Application</h2>
            <div>
                <input
                    type="text"
                    value={inputCSSName}
                    onChange={(e) => setCSSName(e.target.value)}
                    placeholder="CSS Property Name (e.g., background-color)"
                    style={{ padding: '8px', marginRight: '10px' }}
                />
                <input
                    type="text"
                    value={inputCSSValue}
                    onChange={(e) => setCSSValue(e.target.value)}
                    placeholder="CSS Property Value (e.g., red)"
                    style={{ padding: '8px', marginRight: '10px' }}
                />
                <button onClick={addStyle} style={{ padding: '8px 16px' }}>Add Style</button>
            </div>
            
            <div style={{ marginTop: '20px' }}>
                <button onClick={applyStyles} style={{ padding: '8px 16px', marginRight: '10px' }}>Apply Styles</button>
            </div>

            <ul style={{ marginTop: '20px' }}>
                {style.map((s, index) => (
                    <li key={index}>
                        {s.name}: {s.value} 
                        <button onClick={() => removeStyle(index)} style={{ marginLeft: '10px' }}>Remove</button>
                    </li>
                ))}
            </ul>

            <div 
                style={{ 
                    border: '1px solid black', 
                    padding: '20px', 
                    marginTop: '20px',
                    ...appliedStyles 
                }}
            >
                <p>This div will be styled dynamically based on the styles you add.</p>
                
                <div style={{ marginTop: '15px' }}>
                    <h4>Applied CSS Object:</h4>
                    <pre style={{                         
                        padding: '10px', 
                        borderRadius: '5px',
                        fontFamily: 'monospace',
                        fontSize: '14px'
                    }}>
                        {style.length > 0 ? 
                            `{\n${style.map(s => `  "${s.name}": "${s.value}"`).join(',\n')}\n}` 
                            : '{\n  // No styles applied yet\n}'
                        }
                    </pre>
                </div>
            </div>
        </div>
    );
}

export default Assignment_6;