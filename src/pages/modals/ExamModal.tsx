import React, { useState } from 'react';
import Modal from './modal';

interface ExamModalProps {
    onClose: () => void;
    onSave: (examData: { topic: string; questions: { question: string; options: string[]; correctAnswer: string }[] }) => void;
}

export default function ExamModal({ onClose, onSave }: ExamModalProps) {
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState<{ question: string; options: string[]; correctAnswer: string }[]>([
        { question: '', options: ['', '', '', ''], correctAnswer: '' }
    ]);

    // Añadir una nueva pregunta
    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    };

    // Manejar cambios en las preguntas (texto y respuesta correcta)
    const handleQuestionChange = (index: number, key: keyof typeof questions[0], value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][key] = value;
        setQuestions(updatedQuestions);
    };

    // Manejar cambios en las opciones
    const handleOptionChange = (index: number, optionIndex: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    // Guardar el examen
    const handleSave = () => {
        onSave({ topic, questions });
        onClose();
    };

    return (
        <Modal
            title="Crear Examen"
            message="Completa la información para tu examen."
            onClose={onClose}
            footer={
                <button className="btn btn-primary" onClick={handleSave} disabled={!topic || questions.some(q => !q.question || !q.correctAnswer)}>
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

            {questions.map((q, index) => (
                <div key={index} className="mb-3">
                    <label className="form-label">Pregunta {index + 1}:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                        placeholder="Escriba la pregunta"
                    />
                    <div className="mt-2">
                        <label className="form-label">Opciones:</label>
                        {q.options.map((option, optionIndex) => (
                            <input
                                key={optionIndex}
                                type="text"
                                className="form-control mb-2"
                                value={option}
                                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                placeholder={`Opción ${optionIndex + 1}`}
                            />
                        ))}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Respuesta Correcta:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={q.correctAnswer}
                            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                            placeholder="Escriba la respuesta correcta"
                        />
                    </div>
                </div>
            ))}

            <button className="btn btn-secondary" onClick={handleAddQuestion}>
                Agregar Pregunta
            </button>
        </Modal>
    );
}
