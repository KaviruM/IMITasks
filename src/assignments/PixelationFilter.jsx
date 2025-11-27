import React, { useState, useRef } from 'react';
import './PixelationFilter.css';

const PixelationFilter = () => {
  const [image, setImage] = useState(null);
  const [pixelSize, setPixelSize] = useState(10);
  const originalRef = useRef(null);
  const pixelatedRef = useRef(null);
  const fileRef = useRef(null);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        drawOriginal(img);
        pixelate(img);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const drawOriginal = (img) => {
    const canvas = originalRef.current;
    const ctx = canvas.getContext('2d');
    
    let { width, height } = img;
    const maxSize = 300;
    
    if (width > height && width > maxSize) {
      height = (height * maxSize) / width;
      width = maxSize;
    } else if (height > maxSize) {
      width = (width * maxSize) / height;
      height = maxSize;
    }
    
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
  };

  const pixelate = (img) => {
    const canvas = pixelatedRef.current;
    const ctx = canvas.getContext('2d');
    const originalCanvas = originalRef.current;
    
    canvas.width = originalCanvas.width;
    canvas.height = originalCanvas.height;
    
    const { width, height } = canvas;
    ctx.drawImage(img, 0, 0, width, height);
    
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    ctx.clearRect(0, 0, width, height);
    
    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3] / 255;
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }
  };

  const changePixelSize = (e) => {
    const newSize = parseInt(e.target.value);
    setPixelSize(newSize);
    if (image) pixelate(image);
  };

  const download = () => {
    const canvas = pixelatedRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'pixelated-image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="pixelation-container">
      <h1>Image Pixelation Filter</h1>
      
      <div className="image-section">
        <div className="image-container">
          <div className="image-label">Original</div>
          <canvas ref={originalRef} className="image-canvas" />
        </div>
        
        <div className="image-container">
          <div className="image-label">Pixelated</div>
          <canvas ref={pixelatedRef} className="image-canvas" />
        </div>
      </div>

      <div className="controls">
        <input
          type="file"
          ref={fileRef}
          onChange={uploadImage}
          accept="image/*"
          style={{ display: 'none' }}
        />
        
        <button className="btn btn-primary" onClick={() => fileRef.current?.click()}>
          Upload
        </button>

        <div className="slider-container">
          <input
            type="range"
            min="2"
            max="50"
            value={pixelSize}
            onChange={changePixelSize}
            className="pixel-slider"
          />
          <span className="slider-label">Pixel Size: {pixelSize}</span>
        </div>

        <button className="btn btn-secondary" onClick={download} disabled={!image}>
          Download
        </button>
      </div>
    </div>
  );
};

export default PixelationFilter;