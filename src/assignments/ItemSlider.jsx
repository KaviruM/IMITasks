import React, { useState } from "react";
import "./ItemSlider.css";

function ItemSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = 8;
  const radius = 200;
  const containerWidth = 700;

  const items = Array.from({ length: totalItems }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    content: `Content ${i + 1}`,
  }));

  function getCoords(count, radius, rotation) {
    const coords = [];
    const angleStep = (2 * Math.PI) / count;
    const rotationRad = (rotation * Math.PI) / 180;
    const startOffset = -Math.PI / 2;
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep + rotationRad + startOffset;
      coords.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle) });
    }
    return coords;
  }

  function getStyle(index) {
    const rotation = currentIndex * (360 / totalItems);
    const coords = getCoords(totalItems, radius, rotation);
    const { x, y } = coords[index];

    if (y > 50)
      return {
        opacity: 0,
        left: "0px",
        transform: "translateY(-50%) scale(0.8)",
        zIndex: 0,
      };

    const visible = coords
      .map((coord, i) => ({ i, coord }))
      .filter((item) => item.coord.y <= 50)
      .sort((a, b) => a.coord.y - b.coord.y)
      .slice(0, 3);

    if (!visible.some((item) => item.i === index))
      return {
        opacity: 0,
        left: "0px",
        transform: "translateY(-50%) scale(0.8)",
        zIndex: 0,
      };

    const position = visible.findIndex((item) => item.i === index);
    const itemWidth = 180;
    const gap = 40;
    const centerX = containerWidth / 2;

    if (position === 0) {
      return {
        left: `${centerX - itemWidth / 2}px`,
        transform: "translateY(-50%) scale(1.3)",
        opacity: 1,
        zIndex: 3,
      };
    }

    const left =
      x > 0
        ? centerX + itemWidth / 2 + gap
        : centerX - itemWidth / 2 - gap - itemWidth;

    return {
      left: `${left}px`,
      transform: "translateY(-50%) scale(1)",
      opacity: 0.8,
      zIndex: 2,
    };
  }

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        <button
          className="nav-button"
          onClick={() =>
            setCurrentIndex((currentIndex - 1 + totalItems) % totalItems)
          }
        >
          ‹
        </button>
        <div className="items-container">
          {items.map((item, index) => (
            <div key={item.id} className="item-card" style={getStyle(index)}>
              <div className="item-title">{item.name}</div>
              <div className="item-content">{item.content}</div>
            </div>
          ))}
        </div>
        <button
          className="nav-button"
          onClick={() => setCurrentIndex((currentIndex + 1) % totalItems)}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default ItemSlider;
