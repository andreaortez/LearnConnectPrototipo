import React, { useState } from "react";

interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
  correctAnswers: boolean[];
  onAnswer: (isCorrect: boolean) => void;
}

export default function MultipleChoiceQuestion({ question, options, correctAnswers, onAnswer }: MultipleChoiceQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<boolean[]>(Array(options.length).fill(false));

  const handleToggle = (index: number) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[index] = !updatedSelections[index];
    setSelectedOptions(updatedSelections);

    const isCorrect = JSON.stringify(updatedSelections) === JSON.stringify(correctAnswers);
    onAnswer(isCorrect);
  };

  return (
    <div className="question-container">
      <h5 className="mb-3">{question}</h5>
      {options.map((option, index) => (
        <button
          key={index}
          className={`btn w-100 text-left mb-2 ${selectedOptions[index] ? (correctAnswers[index] ? "btn-success" : "btn-danger") : "btn-light"}`}
          onClick={() => handleToggle(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
