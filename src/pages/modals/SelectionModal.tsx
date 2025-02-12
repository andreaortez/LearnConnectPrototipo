import React, { useState } from 'react';
import Modal from './modal';

interface SelectionModalProps {
    onClose: () => void;
    onSelection: (data: { topic: string; content: string[] }) => void;
}

export default function SelectionModal({ onClose, onSelection }: SelectionModalProps) {
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedContent, setSelectedContent] = useState({
        flashcards: false,
        exams: false,
        summaries: false
    });

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setSelectedContent((prevState) => ({ ...prevState, [name]: checked }));
    };

    const handleSubmit = () => {
        const contentOptions = Object.keys(selectedContent)
    .filter((key) => selectedContent[key as keyof typeof selectedContent]);

        onSelection({ topic: selectedTopic, content: contentOptions });
        onClose();
    };

    return (
        <Modal
            title="Seleccionar Tema y Contenido"
            message="Elige el tema y los recursos que deseas generar."
            onClose={onClose}
            footer={
                <button className="btn btn-primary" onClick={handleSubmit} disabled={!selectedTopic || !Object.values(selectedContent).includes(true)}>
                    Generar
                </button>
            }
        >
            <div className="mb-3">
                <label className="form-label">Tema:</label>
                <input
                    type="text"
                    className="form-control"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    placeholder="Ingrese el tema"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Seleccionar Contenido:</label>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="flashcards"
                            checked={selectedContent.flashcards}
                            onChange={handleContentChange}
                        />
                        Flashcards
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="exams"
                            checked={selectedContent.exams}
                            onChange={handleContentChange}
                        />
                        Exámenes
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="summaries"
                            checked={selectedContent.summaries}
                            onChange={handleContentChange}
                        />
                        Resúmenes
                    </label>
                </div>
            </div>
        </Modal>
    );
}
