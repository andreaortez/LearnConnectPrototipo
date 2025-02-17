import React from 'react';
import ExamModal from './modals/ExamModal'
import FlashcardModal from './modals/FlashcardModal'
import SummaryModal from './modals/SummaryModal'
import { useState, useEffect } from "react";

interface activities {
    exam: boolean
    flashcards: boolean
    summary: boolean
}

export default function Actividades() {
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<activities>({
        flashcards: false,
        summary: false,
        exam: false,
    });

    const [currentStep, setCurrentStep] = useState<number>(0);
    const [content,setContent] = useState({
        flashcards: null,
        exam: null,
        summary: null,
    });

    useEffect(() => {
    const flashcardStorage = localStorage.getItem("flashcard") === "true";
    const summaryStorage = localStorage.getItem("summary") === "true";
    const examStorage = localStorage.getItem("exam") === "true";

    setSelectedOptions({
        flashcards: flashcardStorage,
        summary: summaryStorage,
        exam: examStorage,
      });
  
      const flashcardData = localStorage.getItem("flashcardData");
      const summaryData = localStorage.getItem("summaryData");
      const examData = localStorage.getItem("examData");
  

      setContent({
        flashcards: flashcardData ? JSON.parse(flashcardData) : null,
        summary: summaryData? JSON.parse(summaryData) : null,
        exam: examData ? JSON.parse(examData) : null,
      });

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
  }, []);

  if (isLoading) {
    return <div>Cargando Actividades...</div>;
  }


  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const modalsOrder = [
    { show: selectedOptions.flashcards, content: content.flashcards, component: FlashcardModal },
    { show: selectedOptions.summary, content: content.summary, component: SummaryModal },
    { show: selectedOptions.exam, content: content.exam, component: ExamModal },
  ];

  const currentModal = modalsOrder[currentStep];

    return (
    <>
       <div id="actividades" className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>Actividades Generadas</h1>

      {currentModal && currentModal.show && currentModal.content && (
        <currentModal.component
          data={currentModal.content}
          onClose={handleNextStep} // Move to the next step when the user finishes
        />
      )}

      {!currentModal && <h2>¡Has completado todas las actividades!</h2>}
    </div>
  );
    </>
    );
};