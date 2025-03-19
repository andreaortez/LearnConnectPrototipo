import React, { useState } from "react";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import { useRouter } from "next/router";

interface Question {
  tipo: number; // 0 = Selección Única, 1 = Selección Múltiple, 2 = Verdadero/Falso
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
  questions: Question[];
  onClose: () => void;
}

export default function Exam({ questions, onClose }: ExamProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {showResult ? "Resultado del Examen" : `Pregunta ${currentIndex + 1} de ${questions.length}`}
            </h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>

          {!showResult ? (
            <div className="modal-body">
              {questions[currentIndex].tipo === 0 ? (
                <SingleChoiceQuestion
                  question={questions[currentIndex].question}
                  options={[questions[currentIndex].option1!, questions[currentIndex].option2!, questions[currentIndex].option3!, questions[currentIndex].option4!]}
                  correctAnswer={questions[currentIndex].rightAnswer!}
                  onAnswer={handleAnswer}
                />
              ) : questions[currentIndex].tipo === 1 ? (
                <MultipleChoiceQuestion
                  question={questions[currentIndex].question}
                  options={[questions[currentIndex].option1!, questions[currentIndex].option2!, questions[currentIndex].option3!, questions[currentIndex].option4!]}
                  correctAnswers={[
                    questions[currentIndex].correctOption1!,
                    questions[currentIndex].correctOption2!,
                    questions[currentIndex].correctOption3!,
                    questions[currentIndex].correctOption4!,
                  ]}
                  onAnswer={handleAnswer}
                />
              ) : (
                <TrueFalseQuestion
                  question={questions[currentIndex].question}
                  correctAnswer={questions[currentIndex].answer!}
                  onAnswer={handleAnswer}
                />
              )}
            </div>
          ) : (
            <div className="modal-body">
              <p className="mt-5 mb-5">
                Has completado el examen.<br />
                Respuestas correctas: {score} de {questions.length}.
              </p>
            </div>
          )}

          <div className="modal-footer">
            <button className="btn btn-verde" onClick={showResult ? () => router.push("/HomePage") : () => handleAnswer(false)}>
              {showResult ? "Cerrar" : "Siguiente"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
