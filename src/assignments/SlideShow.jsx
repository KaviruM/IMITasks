import React, { useState } from "react";
import "./SlideShow.css";

const SlideShow = () => {
  const [slides, setSlides] = useState([
    { id: 1, text: "Welcome to My Presentation", color: "#4285f4", animation: "fade" },
    { id: 2, text: "Second Slide", color: "#ea4335", animation: "slideUp" },
    { id: 3, text: "Third Slide", color: "#34a853", animation: "blur" },
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);
  const [presentSlide, setPresentSlide] = useState(0);
  const [editingText, setEditingText] = useState(false);

  const colors = ["#4285f4", "#ea4335", "#34a853", "#ff6d00", "#9c27b0"];
  const animations = ["fade", "slideUp", "slideDown", "blur", "rotate"];

  const createSlide = () => {
    const newSlide = {
      id: Date.now(),
      text: "New Slide",
      color: "#4285f4",
      animation: "fade",
    };
    setSlides([...slides, newSlide]);
  };

  const deleteSlide = () => {
    if (slides.length > 1) {
      const newSlides = slides.filter((_, index) => index !== currentSlide);
      setSlides(newSlides);
      if (currentSlide >= newSlides.length) {
        setCurrentSlide(newSlides.length - 1);
      }
    }
  };

  const updateText = (newText) => {
    const updatedSlides = [...slides];
    updatedSlides[currentSlide].text = newText;
    setSlides(updatedSlides);
  };

  const updateColor = (color) => {
    const updatedSlides = [...slides];
    updatedSlides[currentSlide].color = color;
    setSlides(updatedSlides);
  };

  const updateAnimation = (animation) => {
    const updatedSlides = [...slides];
    updatedSlides[currentSlide].animation = animation;
    setSlides(updatedSlides);
  };

  const startPresentation = () => {
    setIsPresenting(true);
    setPresentSlide(0);
  };

  const nextSlide = () => {
    if (presentSlide < slides.length - 1) {
      setPresentSlide(presentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (presentSlide > 0) {
      setPresentSlide(presentSlide - 1);
    }
  };

  const exitPresentation = () => {
    setIsPresenting(false);
  };

  const handleTextEdit = () => {
    setEditingText(true);
  };

  const handleTextSave = () => {
    setEditingText(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTextSave();
    }
  };

  const renderPresentationView = () => {
    const slide = slides[presentSlide];
    
    return (
      <div className="presentation" style={{ backgroundColor: slide.color }}>
        <div className={`slide-content ${slide.animation}`}>
          {slide.text}
        </div>

        <div className="presentation-controls">
          <button onClick={prevSlide} disabled={presentSlide === 0}>
            Previous
          </button>
          
          <span>
            {presentSlide + 1} / {slides.length}
          </span>

          <button onClick={nextSlide} disabled={presentSlide === slides.length - 1}>
            Next
          </button>
        </div>

        <button className="exit-btn" onClick={exitPresentation}>
          Exit
        </button>
      </div>
    );
  };

  const renderSidebar = () => (
    <div className="sidebar">
      <h2>Slides</h2>
      
      <div className="slide-thumbnails">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide-thumb ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundColor: slide.color }}
            onClick={() => setCurrentSlide(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <button className="add-slide" onClick={createSlide}>
        +
      </button>
    </div>
  );

  const renderToolbar = () => (
    <div className="toolbar">
      <button onClick={deleteSlide} disabled={slides.length === 1}>
        Delete Slide
      </button>
      
      <button onClick={startPresentation}>
        Start Presentation
      </button>
    </div>
  );

  const renderSlidePreview = () => {
    const slide = slides[currentSlide];
    
    return (
      <div className="slide-preview" style={{ backgroundColor: slide.color }}>
        {editingText ? (
          <input
            type="text"
            value={slide.text}
            onChange={(e) => updateText(e.target.value)}
            onBlur={handleTextSave}
            onKeyPress={handleKeyPress}
            className="text-editor"
            autoFocus
          />
        ) : (
          <div className="slide-text" onClick={handleTextEdit}>
            {slide.text}
          </div>
        )}
      </div>
    );
  };

  const renderColorPicker = () => {
    const currentColor = slides[currentSlide].color;
    
    return (
      <div className="color-picker">
        <label>Background Color:</label>
        
        <input
          type="color"
          value={currentColor}
          onChange={(e) => updateColor(e.target.value)}
        />

        <div className="color-options">
          {colors.map((color) => (
            
            <button
              key={color}
              className={`color-btn ${currentColor === color ? "selected" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => updateColor(color)}
            />

          ))}
        </div>

      </div>
    );
  };

  const renderAnimationPicker = () => {
    const currentAnimation = slides[currentSlide].animation;
    
    return (
      <div className="animation-picker">
        <label>Animation:</label>

        <div className="animation-options">
            
          {animations.map((animation) => (
            
            <button
              key={animation}
              className={`animation-btn ${currentAnimation === animation ? "selected" : ""}`}
              onClick={() => updateAnimation(animation)}
            >
              {animation}
            </button>

          ))}
        </div>
      </div>
    );
  };

  const renderControls = () => (
    <div className="controls">
      {renderColorPicker()}
      {renderAnimationPicker()}
    </div>
  );

  const renderEditorView = () => (
    <div className="editor">
      {renderSidebar()}
      
      <div className="main-editor">
        {renderToolbar()}
        {renderSlidePreview()}
        {renderControls()}
      </div>
    </div>
  );

  return isPresenting ? renderPresentationView() : renderEditorView();
};

export default SlideShow;