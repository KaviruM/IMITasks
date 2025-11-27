import React, { useState, useEffect } from "react";
import "./FlipMatch.css";

const categories = [
  { label: "Nature", items: ["☘️", "🏕️", "🌿", "🌲", "🌳", "🌾", "🌴", "🍃"] },
  { label: "Foods", items: ["🍔", "🥤", "🥗", "🍗", "🍟", "🥓", "🥞", "🍲"] },
  { label: "Animals", items: ["🐹", "🦊", "🦁", "🦓", "🐱", "🐶", "🐯", "🐼"] },
  { label: "Dessert", items: ["🍧", "🍨", "🧁", "🍰", "🍫", "🍩", "🍦", "🍹"] },
];

export default function FlipMatch() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    initializeGame(categories[0].items);
  }, []);

  const initializeGame = (items) => {
    const duplicatedItems = [...items, ...items];
    const shuffledCards = duplicatedItems.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const handleCardClick = (index) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards;

      if (cards[firstCard] === cards[secondCard]) {
        setMatchedCards((prev) => [...prev, firstCard, secondCard]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 500);
      }
    }
  };

  const isCardFlipped = (index) => {
    return flippedCards.includes(index) || matchedCards.includes(index);
  };

  const isCardMatched = (index) => {
    return matchedCards.includes(index);
  };

  return (
    <div className="game-board">
      <div className="buttons">
        {categories.map((category) => (
          <button
            key={category.label}
            onClick={() => initializeGame(category.items)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid">
        {cards.map((symbol, index) => (
          <div key={index} className="card-container">
            <div
              className={`card ${isCardFlipped(index) ? "flipped" : ""} ${
                isCardMatched(index) ? "matched" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-front">❓</div>
              <div className="card-back">{symbol}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
