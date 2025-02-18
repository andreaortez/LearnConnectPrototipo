import SummaryModal from './modals/SummaryModal';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface SummaryModalProps {
  summary: string
}

export default function Summary({ summary }: SummaryModalProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flashcard-inner">
         <div className="flashcard-front">
          <p>{summary}</p>
        </div>
        <div className="flashcard-back">
          <h3>{summary}</h3>
        </div>
       
      </div>
    </div>
  );
}

