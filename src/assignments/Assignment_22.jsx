import React from 'react';
import './Assignment_22.css';

function Assignment_22() {
    const [image, setImage] = React.useState(null);
    const [blur, setBlur] = React.useState(0);
    const [brightness, setBrightness] = React.useState(100);
    const [contrast, setContrast] = React.useState(100);
    const [grayscale, setGrayscale] = React.useState(0);
    const [invert, setInvert] = React.useState(0);
    const [hueRotate, setHueRotate] = React.useState(0);
    const [sepia, setSepia] = React.useState(0);
    const [saturate, setSaturate] = React.useState(100);
    const [showImage, setShowImage] = React.useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setShowImage(true);
            }
            reader.readAsDataURL(file);
        }
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const numValue = parseFloat(value) || 0;
        
        switch (name) {
            case 'blur':
                setBlur(numValue);
                break;
            case 'brightness':
                setBrightness(numValue);
                break;
            case 'contrast':
                setContrast(numValue);
                break;
            case 'grayscale':
                setGrayscale(numValue);
                break;
            case 'invert':
                setInvert(numValue);
                break;
            case 'hueRotate':
                setHueRotate(numValue);
                break;
            case 'sepia':
                setSepia(numValue);
                break;
            case 'saturate':
                setSaturate(numValue);
                break;
            default:
                break;
        }
    };

    const resetImage = () => {
        setImage(null);
        setShowImage(false);
    };

    const resetFilters = () => {
        setBlur(0);
        setBrightness(100);
        setContrast(100);
        setGrayscale(0);
        setInvert(0);
        setHueRotate(0);
        setSepia(0);
        setSaturate(100);
    };

    const getFilterStyle = () => {
        const filters = [
            `blur(${blur}px)`,
            `brightness(${brightness}%)`,
            `contrast(${contrast}%)`,
            `grayscale(${grayscale}%)`,
            `invert(${invert}%)`,
            `hue-rotate(${hueRotate}deg)`,
            `sepia(${sepia}%)`,
            `saturate(${saturate}%)`
        ];

        return {
            filter: filters.join(' ')
        };
    };

    return (
        <div className="image-filter-app">
            <h2>Assignment 22: Image Filter Application</h2>
            
            <div className="upload-section">
                <h3>Upload Image</h3>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <button onClick={resetImage} className="reset-image-btn">Reset Image</button>
            </div>

            {showImage && (
                <div className="image-display">
                    <h3>Uploaded Image</h3>
                    <img 
                        src={image} 
                        alt="Uploaded" 
                        className="filtered-image"
                        style={getFilterStyle()} 
                    />
                </div>
            )}

            <div className="filters-section">
                <h3>Filters</h3>
                <button onClick={resetFilters} className="reset-filters-btn">
                    Reset All Filters
                </button>
                
                <div className="filters-grid">
                    <div className="filter-control">
                        <label>Blur: {blur}px</label>
                        <input
                            type="range"
                            name="blur"
                            min="0"
                            max="20"
                            value={blur}
                            onChange={handleFilterChange}
                            className="filter-slider"
                        />
                    </div>

                    <div className="filter-control">
                        <label>Brightness: {brightness}%</label>
                        <input
                            type="range"
                            name="brightness"
                            min="0"
                            max="200"
                            value={brightness}
                            onChange={handleFilterChange}
                            className="filter-slider"
                        />
                    </div>

                    <div className="filter-control">
                        <label>Contrast: {contrast}%</label>
                        <input
                            type="range"
                            name="contrast"
                            min="0"
                            max="200"
                            value={contrast}
                            onChange={handleFilterChange}
                            className="filter-slider"
                        />
                    </div>

                    <div className="filter-control">
                        <label>Grayscale: {grayscale}%</label>
                        <input
                            type="range"
                            name="grayscale"
                            min="0"
                            max="100"
                            value={grayscale}
                            onChange={handleFilterChange}
                            className="filter-slider"
                        />
                    </div>

                    <div className="filter-control">
                        <label>Invert: {invert}%</label>
                        <input
                            type="range"
                            name="invert"
                            min="0"
                            max="100"
                            value={invert}
                            onChange={handleFilterChange}
                            className="filter-slider"
                        />
                    </div>

                    <div className="filter-control">
                        <label>Hue Rotate: {hueRotate}°</label>
                        <input
                            type="range"
                            name="hueRotate"
                            min="0"
                            max="360"
                            value={hueRotate}
                            onChange={handleFilterChange}
                            className="filter-slider"
                        />
                    </div>

                    <div className="filter-control">
                        <label>Sepia: {sepia}%</label>
                        <input
                            type="range"
                            name="sepia"
                            min="0"
                            max="100"
                            value={sepia}
                            onChange={handleFilterChange}
                            className="filter-slider"
                        />
                    </div>

                    <div className="filter-control">
                        <label>Saturate: {saturate}%</label>
                        <input
                            type="range"
                            name="saturate"
                            min="0"
                            max="200"
                            value={saturate}
                            onChange={handleFilterChange}
                            className="filter-slider"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Assignment_22;