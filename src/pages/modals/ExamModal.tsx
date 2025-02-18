import React, { useState } from 'react';
import Modal from './modal';
import { useRouter } from 'next/router';

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
  const [showResult, setShowResult] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const exam = typeof data === "string" ? JSON.parse(data) : data; //parseo data a un array
  const currentQuestion = exam[currentQuestionIndex];
  const totalQuestions = exam.length;

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      //validamos que la respuesta este buena
      if (selectedOption === currentQuestion.rightAnswer) {
        setCorrectAnswersCount((prev) => prev + 1);
      }
      setSelectedOption(null);
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
      }
    } else {
      alert('Por favor, selecciona una respuesta.');
    }
  };

  const HomePage = () => {
    router.push("/HomePage")
  }

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {showResult ? 'Resultado del Examen' : `Pregunta ${currentQuestionIndex + 1} de ${totalQuestions}`}
            </h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          {!showResult ? (
            <div className="modal-body">
              <p id="pregunta" className="mb-5 mt-4">{currentQuestion.question}</p>
              <div className="row mt-5 mb-4 w-100">
                <div className="col-6">
                  {[1, 2].map((num) => (
                    <div className="form-check mb-3 text-start" key={num}>
                      <input
                        type="radio"
                        className="form-check-input"
                        id={`option${num}-${currentQuestionIndex}`}
                        checked={selectedOption === num}
                        onChange={() => handleOptionSelect(num)}
                      />
                      <label className="form-check-label respuesta" htmlFor={`option${num}-${currentQuestionIndex}`}>
                        {currentQuestion[`option${num}` as keyof typeof currentQuestion]}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="col-6">
                  {[3, 4].map((num) => (
                    <div className="form-check mb-3 text-start" key={num}>
                      <input
                        type="radio"
                        className="form-check-input"
                        id={`option${num}-${currentQuestionIndex}`}
                        checked={selectedOption === num}
                        onChange={() => handleOptionSelect(num)}
                      />
                      <label className="form-check-label respuesta" htmlFor={`option${num}-${currentQuestionIndex}`}>
                        {currentQuestion[`option${num}` as keyof typeof currentQuestion]}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="modal-body">
              <p className='mt-5 mb-5'>
                Has completado el examen.<br />
                Respuestas correctas: {correctAnswersCount} de {totalQuestions}.
              </p>
            </div>
          )}
          <div className="modal-footer">
            <button
              className="btn btn-verde"
              onClick={showResult ? HomePage : handleNextQuestion}
            >
              {showResult ? 'Cerrar' : 'Siguiente'}
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}
