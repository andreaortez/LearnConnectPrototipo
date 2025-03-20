import React, { useState } from "react";
import { useRouter } from "next/router";

interface Question {
  tipo: number; // 0 = Single Choice, 1 = Multiple Choice, 2 = True/False
  question: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  rightAnswer?: number;
  correctOption1?: boolean;
  correctOption2?: boolean;
  correctOption3?: boolean;
  correctOption4?: boolean;
  answer?: boolean;
}

interface ExamProps {
  data: Question[];
  onClose: () => void;
}

export default function ExamModal({ data, onClose }: ExamProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<boolean[]>([]);
  const [hasSelected, setHasSelected] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  const exam = Array.isArray(data) ? data : [];
  const totalQuestions = exam.length;
  const currentQuestion = exam[currentIndex];

  if (exam.length === 0) {
    return (
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">No hay preguntas disponibles</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p>No se encontraron preguntas para este examen.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-verde" onClick={onClose}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAnswer = () => {
    setShowCorrectAnswer(true);
    let isCorrect = false;
    let points = 0;

    if (currentQuestion.tipo === 0) {
      isCorrect = selectedOptions.findIndex((sel) => sel) + 1 === currentQuestion.rightAnswer;
      if (isCorrect) points = 1;
    } else if (currentQuestion.tipo === 1) {
      const correctAnswers = [
        currentQuestion.correctOption1,
        currentQuestion.correctOption2,
        currentQuestion.correctOption3,
        currentQuestion.correctOption4,
      ].map(Boolean);

      const correctSelections = selectedOptions.filter((sel, index) => sel && correctAnswers[index]).length;
      const totalCorrect = correctAnswers.filter((x) => x).length;

      points = totalCorrect > 0 ? correctSelections / totalCorrect : 0;
    } else if (currentQuestion.tipo === 2) {
      isCorrect = selectedOptions[0] === currentQuestion.answer;
      if (isCorrect) points = 1;
    }

    setScore((prevScore) => prevScore + points);
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptions([]);
      setShowCorrectAnswer(false);
      setHasSelected(false);
    } else {
      setShowResult(true);
    }
  };

  const handleSelection = (index: number) => {
    setHasSelected(true);
    if (currentQuestion.tipo === 0 || currentQuestion.tipo === 2) {
      setSelectedOptions([false, false, false, false].map((_, i) => i === index));
    } else if (currentQuestion.tipo === 1) {
      setSelectedOptions((prev) => {
        const newSelections = [...prev];
        newSelections[index] = !newSelections[index];
        return newSelections;
      });
    }
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {showResult ? "Resultado del Examen" : `Pregunta ${currentIndex + 1} de ${totalQuestions}`}
            </h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>

          {!showResult ? (
            <div className="modal-body">
            <p className="text-secondary fs-6 text-start mx-2">
                {currentQuestion.tipo === 0
                  ? "Pregunta de Selección Única"
                  : currentQuestion.tipo === 1
                  ? "Pregunta de Selección Múltiple"
                  : "Pregunta de Verdadero o Falso"}
              </p>
              <h5>{currentQuestion.question}</h5>

              <div className="options-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {currentQuestion.tipo === 2
                  ? ["Verdadero", "Falso"].map((option, index) => (
                      <button
                        key={index}
                        className={`btn w-100 text-left mb-2 border-2 
                          ${showCorrectAnswer
                            ? index === (currentQuestion.answer ? 0 : 1)
                              ? "border-success"
                              : selectedOptions[index]
                              ? "border-danger"
                              : "border-light"
                            : selectedOptions[index]
                            ? "border-secondary"
                            : "border-light"
                          }`}
                        onClick={() => handleSelection(index)}
                        disabled={showCorrectAnswer}
                      >
                        {option}
                      </button>
                    ))
                  : [currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4]
                      .filter(Boolean)
                      .map((option, index) => (
                        <button
                          key={index}
                          className={`btn w-100 text-left mb-2 border-2 
                            ${showCorrectAnswer
                              ? currentQuestion.tipo === 1
                                ? currentQuestion[`correctOption${index + 1}` as keyof Question]
                                  ? "border-success"
                                  : selectedOptions[index]
                                  ? "border-danger"
                                  : "border-light"
                                : currentQuestion.rightAnswer === index + 1
                                ? "border-success"
                                : selectedOptions[index]
                                ? "border-danger"
                                : "border-light"
                              : selectedOptions[index]
                              ? "border-secondary"
                              : "border-light"
                          }`}
                          onClick={() => handleSelection(index)}
                          disabled={showCorrectAnswer}
                        >
                          {option}
                        </button>
                      ))}
              </div>
            </div>
          ) : (
            <div className="modal-body">
              <p className="mt-5 mb-5">
                Has completado el examen.<br />
                Respuestas correctas: {score.toFixed(2)} de {totalQuestions}.
              </p>
            </div>
          )}

          <div className="modal-footer d-flex">
            {!showResult && (
              <>
                {hasSelected && !showCorrectAnswer && (
                  <button className="btn btn-secondary" onClick={handleAnswer} disabled={!hasSelected || showCorrectAnswer}>
                    Revisar Respuesta
                  </button>
                )}

                {/* This ensures "Siguiente" is always on the right */}
                <button className="btn btn-verde ms-auto" onClick={handleNextQuestion} disabled={!showCorrectAnswer}>
                  Siguiente
                </button>
              </>
            )}

            {showResult && (
              <button className="btn btn-verde" onClick={() => router.push("/HomePage")}>
                Cerrar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
