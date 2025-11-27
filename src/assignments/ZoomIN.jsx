import React, { useState, useRef } from "react";
import "./ZoomIN.css";

function ZoomIN() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [animationStyle, setAnimationStyle] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRefs = useRef({});
  const containerRef = useRef(null);

  const getCardColor = (index) => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD"];
    return colors[index % colors.length];
  };

  const handleCardClick = (index, event) => {
    if (isAnimating) return;
    
    event.preventDefault();
    setIsAnimating(true);

    if (expandedCard === index) {
      closeCard(index);
    } else {
      openCard(index);
    }
  };

  const openCard = (index) => {
    const cardElement = cardRefs.current[index];
    const containerElement = containerRef.current;
    
    if (!cardElement || !containerElement) return;

    const cardRect = cardElement.getBoundingClientRect();
    const containerRect = containerElement.getBoundingClientRect();

    const initialX = cardRect.left - containerRect.left;
    const initialY = cardRect.top - containerRect.top;
    const initialWidth = cardRect.width;
    const initialHeight = cardRect.height;


    setAnimationStyle({
      position: 'absolute',
      left: `${initialX}px`,
      top: `${initialY}px`,
      width: `${initialWidth}px`,
      height: `${initialHeight}px`,
      zIndex: 1000,
      transition: 'none'
    });

    setExpandedCard(index);


    setTimeout(() => {
      setAnimationStyle(prev => ({
        ...prev,
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        transition: 'all 0.4s ease-out'
      }));
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 400);
    }, 50);
  };

  const closeCard = (index) => {
    const cardElement = cardRefs.current[index];
    const containerElement = containerRef.current;
    
    if (!cardElement || !containerElement) return;

    const cardRect = cardElement.getBoundingClientRect();
    const containerRect = containerElement.getBoundingClientRect();
    
    const targetX = cardRect.left - containerRect.left;
    const targetY = cardRect.top - containerRect.top;
    const targetWidth = cardRect.width;
    const targetHeight = cardRect.height;


    setAnimationStyle(prev => ({
      ...prev,
      left: `${targetX}px`,
      top: `${targetY}px`,
      width: `${targetWidth}px`,
      height: `${targetHeight}px`,
      transition: 'all 0.4s ease-in'
    }));

    setTimeout(() => {
      setExpandedCard(null);
      setAnimationStyle({});
      setIsAnimating(false);
    }, 400);
  };

  const handleOverlayClick = () => {
    if (expandedCard !== null) {
      handleCardClick(expandedCard, { preventDefault: () => {} });
    }
  };

  const cards = Array.from({ length: 64 }, (_, index) => (
    <div
      ref={el => cardRefs.current[index] = el}
      className="card"
      key={index}
      style={{ 
        backgroundColor: getCardColor(index),
        visibility: expandedCard === index ? 'hidden' : 'visible'
      }}
      onClick={(e) => handleCardClick(index, e)}
    >
      <h2>{index + 1}</h2>
    </div>
  ));

  return (
    <div className="zoom-container" ref={containerRef}>
      <div className="zoom-content">{cards}</div>
      
      {expandedCard !== null && (
        <>
          <div className="overlay" onClick={handleOverlayClick} />
          <div
            className="expanded-card"
            style={{
              backgroundColor: getCardColor(expandedCard),
              ...animationStyle
            }}
          >
            <button 
              className="close-btn" 
              onClick={() => handleCardClick(expandedCard, { preventDefault: () => {} })}
            >
              ×
            </button>
            <div className="expanded-content">
              <h2>{expandedCard + 1}</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ZoomIN;