import React from 'react';
import ExamModal from './modals/ExamModal'
import FlashcardModal from './modals/FlashcardModal'
import SummaryModal from './modals/SummaryModal'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

interface activities {
  exam: boolean
  flashcards: boolean
  summary: boolean
}

interface ModalItem {
  component: React.FC<{ data: any; onClose: () => void }>;
  data: any;
}

export default function Actividades() {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<activities>({
    flashcards: false,
    summary: false,
    exam: false,
  });
  const [recursos, setRecursos] = useState<boolean>(false);

  const router = useRouter();
  const VolverHomePage = () => {
    sessionStorage.removeItem("flashcardData");
    sessionStorage.removeItem("summaryData");
    sessionStorage.removeItem("examData");
    sessionStorage.removeItem("flashcard");
    sessionStorage.removeItem("summary");
    sessionStorage.removeItem("exam");
    router.push("/HomePage")
  }

  const VolverRecursos = () => {
    sessionStorage.removeItem("flashcardData");
    sessionStorage.removeItem("summaryData");
    sessionStorage.removeItem("examData");
    sessionStorage.removeItem("flashcard");
    sessionStorage.removeItem("summary");
    sessionStorage.removeItem("exam");
    sessionStorage.removeItem("recursos");
    router.push("/Recursos")
  }

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [content, setContent] = useState<{
    flashcards: any[] | null;
    exam: any[] | null;
    summary: any[] | null;
  }>({
    flashcards: null,
    exam: null,
    summary: null,
  });

  useEffect(() => {
    const flashcardStorage = sessionStorage.getItem("flashcard") === "true" ? true : false;
    const summaryStorage = sessionStorage.getItem("summary") === "true" ? true : false;
    const examStorage = sessionStorage.getItem("exam") === "true" ? true : false;

    setRecursos(sessionStorage.getItem("recursos") === "true" ? true : false)

    setSelectedOptions({
      flashcards: flashcardStorage,
      summary: summaryStorage,
      exam: examStorage,
    });

    const flashcardData = sessionStorage.getItem("flashcardData");
    const summaryData = sessionStorage.getItem("summaryData");
    const examData = sessionStorage.getItem("examData");
    let parsedExamData: any[] | null = null;

    if (examData) {
      try {
        const parsedData = JSON.parse(examData);
        if (Array.isArray(parsedData)) {
          parsedExamData = parsedData;
        } else {
          console.error("Exam data is not an array!", parsedData);
        }
      } catch (error) {
        console.error("Error parsing exam data:", error);
      }
    }


    setContent({
      flashcards: flashcardData ? JSON.parse(flashcardData) : null,
      summary: summaryData ? JSON.parse(summaryData) : null,
      exam: parsedExamData,
    });

    console.log("Selected Options:", selectedOptions);
    console.log("Content Loaded:", content);

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

  const modalsOrder: ModalItem[] = [
    ...(selectedOptions.flashcards && content.flashcards ? [{ component: FlashcardModal, data: content.flashcards }] : []),
    ...(selectedOptions.summary && content.summary ? [{ component: SummaryModal, data: content.summary }] : []),
    ...(selectedOptions.exam && content.exam ? [{ component: ExamModal, data: content.exam }] : []),
  ];

  const currentModal = modalsOrder[currentStep] ?? null;

  return (
    <>
      <div id="actividades" className="d-flex flex-column justify-content-center align-items-center vh-100">


        {recursos ? (
          <>
            <h1>Actividad Completada</h1>

            {currentModal ? (
              <currentModal.component
                data={currentModal.data}
                onClose={() => setCurrentStep((prevStep) => prevStep + 1)}
              />
            ) : (
              <h2>¡Puedes seguir explorando las actividades!</h2>

            )}

            <button
              className="btn btn-verde fs-5 mt-5 p-3 rounded shadow btn-outline d-flex align-items-center justify-content-center"
              onClick={VolverRecursos}
            >
              <img src="/images/educativo.png" alt="Recursos" className="me-2" width="30" height="24" />
              Mis Recursos
            </button>
          </>
        ) : (
          <>
            <h1>Actividades Generadas</h1>

            {currentModal ? (
              <currentModal.component
                data={currentModal.data}
                onClose={() => setCurrentStep((prevStep) => prevStep + 1)}
              />
            ) : (
              <h2>¡Has completado todas las actividades!</h2>

            )}

            <button
              className="btn btn-verde fs-5 mt-5 p-3 rounded shadow btn-outline d-flex align-items-center justify-content-center"
              onClick={VolverHomePage}
            >
              <img src="/images/hogar.png" alt="Inicio" className="me-2" width="30" height="24" />
              Página de Inicio
            </button>
          </>
        )
        }

      </div >
    </>
  );
};
