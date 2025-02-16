import React from 'react';
import Flashcard from '../Flashcard';

interface FlashcardModalProps {
  data: { word: string; definition: string }[];
  onClose: () => void;
}

export default function FlashcardModal({ data, onClose }: FlashcardModalProps) {
  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Flashcards</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body d-flex flex-wrap justify-content-center">
            {data.map((item, index) => (
              <Flashcard key={index} word={item.word} definition={item.definition} />
            ))}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
