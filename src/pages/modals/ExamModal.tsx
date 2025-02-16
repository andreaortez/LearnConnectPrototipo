/* import React, { useState } from 'react';
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
} */
    import React, { useState } from 'react';
    import Modal from './modal';
    
    interface ExamModalProps {
      data: {
        question: string;
        option1: string;
        option2: string;
        option3: string;
        option4: string;
        rightAnswer: number;
      }[];
      onClose: () => void;
    }
    
    export default function ExamModal({ data, onClose }: ExamModalProps) {
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [selectedOption, setSelectedOption] = useState<number | null>(null);
      const [answers, setAnswers] = useState<number[]>([]);
    
      const currentQuestion = data[currentQuestionIndex];
    
      const handleOptionSelect = (optionIndex: number) => {
        setSelectedOption(optionIndex);
      };
    
      const handleNextQuestion = () => {
        if (selectedOption !== null) {
          setAnswers((prevAnswers) => [...prevAnswers, selectedOption]);
          setSelectedOption(null);
          if (currentQuestionIndex < data.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          } else {
            alert("¡Has completado todas las preguntas!");
            onClose();
          }
        } else {
          alert("Por favor, selecciona una respuesta.");
        }
      };
    
      return (
        <Modal
          title={`Pregunta ${currentQuestionIndex + 1} de ${data.length}`}
          message={currentQuestion.question}
          onClose={onClose}
          footer={
            <button className="btn btn-primary" onClick={handleNextQuestion}>
              {currentQuestionIndex < data.length - 1 ? "Siguiente" : "Finalizar"}
            </button>
          }
        >
          <div className="mt-3">
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id={`option1-${currentQuestionIndex}`}
                checked={selectedOption === 1}
                onChange={() => handleOptionSelect(1)}
              />
              <label className="form-check-label" htmlFor={`option1-${currentQuestionIndex}`}>
                {currentQuestion.option1}
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id={`option2-${currentQuestionIndex}`}
                checked={selectedOption === 2}
                onChange={() => handleOptionSelect(2)}
              />
              <label className="form-check-label" htmlFor={`option2-${currentQuestionIndex}`}>
                {currentQuestion.option2}
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id={`option3-${currentQuestionIndex}`}
                checked={selectedOption === 3}
                onChange={() => handleOptionSelect(3)}
              />
              <label className="form-check-label" htmlFor={`option3-${currentQuestionIndex}`}>
                {currentQuestion.option3}
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id={`option4-${currentQuestionIndex}`}
                checked={selectedOption === 4}
                onChange={() => handleOptionSelect(4)}
              />
              <label className="form-check-label" htmlFor={`option4-${currentQuestionIndex}`}>
                {currentQuestion.option4}
              </label>
            </div>
          </div>
        </Modal>
      );
    }
    