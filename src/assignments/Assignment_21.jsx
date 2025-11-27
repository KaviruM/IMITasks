import React from 'react'
import { useRef, useState } from 'react'

function Assignment_21() {
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(false);
    const [selectedColor, setSelectedColor] = useState({r: 0, g: 0, b: 0});
    const [showColor, setShowColor] = useState(false);

    const handleUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            return;
        }

        const objectURL = URL.createObjectURL(file);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            setImage(true);
            URL.revokeObjectURL(objectURL);
        };
        
        img.src = objectURL;
    };

    const handleCanvasClick = (event) => {
        if (!image) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        // Calculate the scale factors
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        // Get click coordinates relative to the canvas element
        const clientX = event.clientX - rect.left;
        const clientY = event.clientY - rect.top;
        
        // Convert to canvas coordinates
        const x = Math.floor(clientX * scaleX);
        const y = Math.floor(clientY * scaleY);
        
        // Make sure coordinates are within bounds
        if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
            return;
        }
        
        const imageData = ctx.getImageData(x, y, 1, 1);
        const pixel = imageData.data;
        
        const color = {
            r: pixel[0],
            g: pixel[1],
            b: pixel[2]
        };
        
        setSelectedColor(color);
        setShowColor(true);
    };

    const rgbToHex = (r, g, b) => {
        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const handleReset = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setImage(false);
        setShowColor(false);
        setSelectedColor({r: 0, g: 0, b: 0});
        
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const rgbString = `rgb(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b})`;
    const hexString = rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b);

    return (
        <div className="assignment-container" style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#2d2d2d',
            color: 'white',
            margin: 0,
            padding: '20px',
            textAlign: 'center',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
            minHeight: '100vh'
        }}>
            <h1 style={{
                fontSize: '24px',
                marginBottom: '30px',
                fontWeight: 'normal'
            }}>Assignment 21 - Color Picker</h1>
            
            <div className="controls" style={{ marginBottom: '30px' }}>
                <button onClick={handleUpload} style={{
                    backgroundColor: '#4a4a4a',
                    color: 'white',
                    border: '1px solid #666',
                    padding: '8px 16px',
                    margin: '0 10px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}>Upload Image</button>
                <button onClick={handleReset} style={{
                    backgroundColor: '#4a4a4a',
                    color: 'white',
                    border: '1px solid #666',
                    padding: '8px 16px',
                    margin: '0 10px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}>Reset</button>
            </div>
            
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            
            <div className="instruction-text" style={{
                margin: '20px 0',
                fontSize: '16px'
            }}>
                {image ? (
                    <p>Click on the image to pick colors</p>
                ) : (
                    <p>Upload an image to start</p>
                )}
            </div>
            
            <div className="canvas-container" style={{ margin: '20px 0' }}>
                <canvas 
                    ref={canvasRef} 
                    onClick={handleCanvasClick}
                    style={{ 
                        cursor: image ? 'crosshair' : 'default',
                        display: image ? 'block' : 'none',
                        border: '2px solid #666',
                        maxWidth: '100%'
                    }}
                />
            </div>
            
            {showColor && (
                <div className="color-display" style={{
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#3a3a3a',
                    borderRadius: '5px',
                    display: 'inline-block'
                }}>
                    <div className="color-info" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '30px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <div className="color-preview">
                            <p style={{
                                margin: '0 0 10px 0',
                                fontWeight: 'bold'
                            }}>Color Preview</p>
                            <div 
                                className="color-swatch"
                                style={{ 
                                    backgroundColor: rgbString,
                                    width: '60px',
                                    height: '60px',
                                    border: '2px solid #666',
                                    display: 'inline-block'
                                }}
                            ></div>
                        </div>
                        
                        <div className="color-values" style={{ textAlign: 'left' }}>
                            <p style={{
                                margin: '5px 0',
                                fontSize: '14px'
                            }}><strong>RGB:</strong> {rgbString}</p>
                            <p style={{
                                margin: '5px 0',
                                fontSize: '14px'
                            }}><strong>HEX:</strong> {hexString}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Assignment_21