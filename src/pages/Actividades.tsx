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
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<activities>({
        flashcards: false,
        summary: false,
        exam: false,
    });

    useEffect(() => {
        const flashcardStorage = localStorage.getItem("flashcard");
        const examStorage = localStorage.getItem("exam");
        const summaryStorage = localStorage.getItem("summary");
        if (flashcardStorage === "true") {
            setSelectedOptions(prev => ({ ...prev, flashcards: true }));
        }
        if (examStorage === "true") {
            setSelectedOptions(prev => ({ ...prev, exam: true }));
        }
        if (summaryStorage === "true") {
            setSelectedOptions(prev => ({ ...prev, summary: true }));
        }
    }, []);

    return (<>
        <div id="actividades" className="d-flex justify-content-center align-items-center vh-100">

        </div >
        {selectedOptions.exam && <ExamModal />}
        {selectedOptions.exam && <FlashcardModal />}
        {selectedOptions.exam && <SummaryModal />}
    </>
    );
};