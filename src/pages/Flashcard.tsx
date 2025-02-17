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
          <p>{definition}</p>
        </div>
        <div className="flashcard-back">
          <h3>{word}</h3>
        </div>
       
      </div>
    </div>
  );
}

