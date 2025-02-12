import React, { useState } from 'react';
import Modal from './modal';


interface FlashcardModalProps {
    onClose: () => void;
    onSave: (flashcardData: { topic: string; question: string; answer: string }) => void;
}

export default function FlashcardModal({ onClose, onSave }: FlashcardModalProps) {
    const [topic, setTopic] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSave = () => {
        onSave({ topic, question, answer });
        onClose();
    };

    return (
        <Modal
            title="Crear Flashcard"
            message="Completa la información para tu flashcard."
            onClose={onClose}
            footer={
                <button className="btn btn-primary" onClick={handleSave} disabled={!topic || !question || !answer}>
                    Guardar
                </button>
            }
        >
            <div className="mb-3">
                <label className="form-label">Tema:</label>
                <input
                    type="text"
                    className="form-control"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Ingrese el tema"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Pregunta:</label>
                <input
                    type="text"
                    className="form-control"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Escriba la pregunta"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Respuesta:</label>
                <textarea
                    className="form-control"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Ingrese la respuesta"
                ></textarea>
            </div>
        </Modal>
    );
}
