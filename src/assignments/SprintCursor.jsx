import React, { useEffect, useRef, useState, useCallback } from 'react';
import './SprintCursor.css';
import sprintpng from '../assets/cursor-sprite-animation-inactive.png';
import sprintgif from '../assets/cursor-sprite-animation-active.gif';

function SprintCursor() {
  const containerElement = useRef(null);
  const cursorElement = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [movementDirection, setMovementDirection] = useState('down');
  const [cursorIsMoving, setCursorIsMoving] = useState(false);
  const stopMovingTimer = useRef(null);

  const getCursorStyle = (direction, isMoving) => {
    const spriteFrameSize = 48;
    const spritePositions = {
      up: { x: -48, y: 0 },
      left: { x: 0, y: -48 },
      right: { x: -96, y: -48 },
      down: { x: -48, y: -96 },
    };

    const position = spritePositions[direction] || spritePositions.down;
    
    return {
      backgroundImage: `url(${isMoving ? sprintgif : sprintpng})`,
      backgroundPosition: `${position.x}px ${position.y}px`,
      backgroundSize: '144px 144px',
      backgroundRepeat: 'no-repeat',
      width: '48px',
      height: '48px',
    };
  };

  const calculateDirection = (horizontalMovement, verticalMovement) => {
    const minimumMovement = 1;
    
    if (Math.abs(horizontalMovement) > Math.abs(verticalMovement)) {
      if (horizontalMovement > minimumMovement) return 'right';
      if (horizontalMovement < -minimumMovement) return 'left';
    } else {
      if (verticalMovement > minimumMovement) return 'down';
      if (verticalMovement < -minimumMovement) return 'up';
    }
    
    return null;
  };

  const onMouseMove = useCallback((event) => {
    if (!containerElement.current) return;
    
    const containerBounds = containerElement.current.getBoundingClientRect();
    const newMousePosition = {
      x: event.clientX - containerBounds.left,
      y: event.clientY - containerBounds.top
    };

    setMousePosition(newMousePosition);

    const newDirection = calculateDirection(event.movementX, event.movementY);
    
    if (newDirection) {
      setMovementDirection(newDirection);
      setCursorIsMoving(true);

      if (stopMovingTimer.current) {
        clearTimeout(stopMovingTimer.current);
      }

      stopMovingTimer.current = setTimeout(() => {
        setCursorIsMoving(false);
      }, 150);
    }
  }, []);

  const onMouseEnter = useCallback(() => {
    setCursorIsMoving(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setCursorIsMoving(false);
    if (stopMovingTimer.current) {
      clearTimeout(stopMovingTimer.current);
    }
  }, []);

  useEffect(() => {
    const container = containerElement.current;
    if (!container) return;

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      if (stopMovingTimer.current) {
        clearTimeout(stopMovingTimer.current);
      }
    };
  }, [onMouseMove, onMouseEnter, onMouseLeave]);

  const currentCursorStyle = getCursorStyle(movementDirection, cursorIsMoving);

  return (
    <div
      ref={containerElement}
      className="sprint-cursor-container"
    >
      <div
        ref={cursorElement}
        className="directional-cursor"
        style={{
          ...currentCursorStyle,
          left: `${mousePosition.x - 24}px`,
          top: `${mousePosition.y - 24}px`,
        }}
      />

      <div className="instructions">
        MOVE YOUR CURSOR TO WALK
      </div>

      <div className="status-panel">
        <div>Direction: <strong>{movementDirection}</strong></div>
        <div>Status: <strong>{cursorIsMoving ? 'Moving' : 'Idle'}</strong></div>
      </div>
    </div>
  );
}

export default SprintCursor;