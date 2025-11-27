import React, { useEffect, useRef } from 'react';
import './CursorEffect.css';

function CursorEffect() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {

      if (cursorRef.current) {
        cursorRef.current.style.top = `${e.clientY}px`;
        cursorRef.current.style.left = `${e.clientX}px`;
      }


      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.top = `${e.clientY}px`;
      trail.style.left = `${e.clientX}px`;

      document.body.appendChild(trail);

      setTimeout(() => {
        trail.remove();
      }, 700);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div className="cursor-effect-text">
        Move Your Mouse to See the Effect!
      </div>
    </>
  );
}

export default CursorEffect;
