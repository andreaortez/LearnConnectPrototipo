import React, { useState } from "react";

interface SingleChoiceQuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  onAnswer: (isCorrect: boolean) => void;
}

export default function SingleChoiceQuestion({ question, options, correctAnswer, onAnswer }: SingleChoiceQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    onAnswer(index === correctAnswer);
  };

  return (
    <div className="question-container">
      <h5 className="mb-3">{question}</h5>
      {options.map((option, index) => (
        <button
          key={index}
          className={`btn w-100 text-left mb-2 ${selectedOption === index ? (index === correctAnswer ? "btn-success" : "btn-danger") : "btn-light"}`}
          onClick={() => handleSelect(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
