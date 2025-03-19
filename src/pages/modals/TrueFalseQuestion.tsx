import React, { useState } from "react";

interface TrueFalseQuestionProps {
  question: string;
  correctAnswer: boolean;
  onAnswer: (isCorrect: boolean) => void;
}

export default function TrueFalseQuestion({ question, correctAnswer, onAnswer }: TrueFalseQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const handleSelect = (answer: boolean) => {
    setSelectedAnswer(answer);
    onAnswer(answer === correctAnswer);
  };

  return (
    <div className="question-container">
      <h5 className="mb-3">{question}</h5>
      <button
        className={`btn w-100 mb-2 ${selectedAnswer === true ? (correctAnswer ? "btn-success" : "btn-danger") : "btn-light"}`}
        onClick={() => handleSelect(true)}
      >
        Verdadero
      </button>
      <button
        className={`btn w-100 ${selectedAnswer === false ? (!correctAnswer ? "btn-success" : "btn-danger") : "btn-light"}`}
        onClick={() => handleSelect(false)}
      >
        Falso
      </button>
    </div>
  );
}
