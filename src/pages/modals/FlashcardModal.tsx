import React, { useState } from 'react';
import Flashcard from '../Flashcard';

interface FlashcardModalProps {
  data: { word: string; definition: string }[];
  onClose: () => void;
  onNextActivity?: () => void;
}

export default function FlashcardModal({ data, onClose, onNextActivity }: FlashcardModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = data.length;
  const progress = ((currentIndex + 1) / totalCards) * 100;

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // si selecciono otra actividad
      if (onNextActivity) {
        onNextActivity();
      } else {
        onClose();
      }
    }
  };
  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div id='flashcard-container' className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Flashcards</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body d-flex justify-content-center">
            <Flashcard
              word={data[currentIndex].word}
              definition={data[currentIndex].definition}
            />
          </div>
          <div className="w-100">
            {/* 
              <div id='progress-flashcard' className="progress mb-3">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                >
                {Math.round(progress)}%
                </div>
              </div>*/}
            <p className="text-center text-black">
              {currentIndex + 1}/{totalCards}
            </p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-verde me-auto"
              onClick={() => setCurrentIndex(currentIndex - 1)} disabled={currentIndex === 0}
            >
              Anterior
            </button>
            <button
              className="btn btn-verde"
              onClick={handleNext}
            >
              {currentIndex < data.length - 1 ? "Siguiente" : "Finalizar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
