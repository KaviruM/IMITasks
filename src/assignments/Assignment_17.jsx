import React, { useState, useEffect } from 'react';
import './Assignment_17.css';

function Assignment_17() {
    const [color1, setColor1] = useState('#ff0000');
    const [color2, setColor2] = useState('#0000ff');
    const [mixedColor, setMixedColor] = useState('#000000');
    const [gradient, setGradient] = useState('');

    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    };

    const rgbToHex = (r, g, b) => {
        const toHex = (val) => {
            const hex = val.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const mixColors = (hex1, hex2) => {
        const rgb1 = hexToRgb(hex1);
        const rgb2 = hexToRgb(hex2);

        const r = Math.min(rgb1.r + rgb2.r, 255);
        const g = Math.min(rgb1.g + rgb2.g, 255);
        const b = Math.min(rgb1.b + rgb2.b, 255);

        return rgbToHex(r, g, b);
    };

    useEffect(() => {
        const mixed = mixColors(color1, color2);
        setMixedColor(mixed);
        setGradient(`linear-gradient(to right, ${color1}, ${mixed}, ${color2})`);
    }, [color1, color2]);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>Assignment 17: Color Mixer</h2>

            <div style={{ marginBottom: '10px' }}>
                <label>Color 1: </label>
                <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Color 2: </label>
                <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                />
            </div>

            <div style={{
                backgroundColor: mixedColor,
                padding: '20px',
                color: '#fff',
                marginBottom: '10px'
            }}>
                Mixed Color: {mixedColor}
            </div>

            <div style={{
                height: '100px',
                background: gradient,
                border: '1px solid #000',
                marginTop: '20px'
            }}>
                <p style={{ color: '#fff', padding: '10px' }}>Gradient: {gradient}</p>
            </div>
        </div>
    );
}

export default Assignment_17;