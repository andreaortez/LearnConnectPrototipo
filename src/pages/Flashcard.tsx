import React, { useState } from 'react';

interface FlashcardProps {
  word: string;
  definition: string;
}

export default function Flashcard({ word, definition }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <h3>{word}</h3>
        </div>
        <div className="flashcard-back">
          <p>{definition}</p>
        </div>
      </div>
    </div>
  );
}

