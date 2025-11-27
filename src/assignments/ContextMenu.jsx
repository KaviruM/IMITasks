import React, { useState, useEffect, useRef } from 'react';
import './ContextMenu.css';

const ContextMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedTheme, setSelectedTheme] = useState('Default');
  const menuRef = useRef(null);

  const themeColors = {
    'Default': '#2a2a2a',
    'Red': '#4a1c1c',
    'Green': '#1c4a1c',
    'Blue': '#1c1c4a'
  };

  useEffect(() => {
    document.body.style.backgroundColor = themeColors[selectedTheme];

    const handleContextMenu = (event) => {
      event.preventDefault();
      
      const menuWidth = 150;
      const menuHeight = 160;
      const padding = 10;
      
      let x = event.clientX;
      let y = event.clientY;
      
      if (x + menuWidth > window.innerWidth - padding) {
        x = window.innerWidth - menuWidth - padding;
      }
      
      if (y + menuHeight > window.innerHeight - padding) {
        y = window.innerHeight - menuHeight - padding;
      }
      
      if (x < padding) x = padding;
      if (y < padding) y = padding;
      
      setPosition({ x, y });
      setIsVisible(true);
    };

    const handleClick = () => {
      setIsVisible(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsVisible(false);
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleItemClick = (theme) => {
    setSelectedTheme(theme);
    setIsVisible(false);
    document.body.style.backgroundColor = themeColors[theme];
  };

  const createMenuItem = (themeName) => (
    <div 
      key={themeName}
      className={`context-menu-item ${selectedTheme === themeName ? 'selected' : ''}`}
      onClick={() => handleItemClick(themeName)}
    >
      {themeName}
    </div>
  );

  return (
    <>
      <div className="context-menu-placeholder">
        Right-click anywhere to open the context menu
      </div>
      
      <div
        ref={menuRef}
        className={`context-menu ${isVisible ? 'show' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {Object.keys(themeColors).map(themeName => 
          createMenuItem(themeName)
        )}
      </div>
    </>
  );
};

export default ContextMenu;