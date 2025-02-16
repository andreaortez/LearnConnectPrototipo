import React, { useState } from 'react';
import Modal from './modal';

interface Summary {
    topic: string;
    summary: string;
}
interface SummaryModalProps {
    data: Summary[];
    onClose: () => void;
 /*    onSave: (summaryData: { topic: string; summary: string }) => void; */
}

export default function SummaryModal({ onClose, data }: SummaryModalProps) {
    const [topic, setTopic] = useState('');
    const [summary, setSummary] = useState('');

    const handleSave = () => {
        console.log("Summary saved:");
        /* onSave({ topic, summary });
        onClose(); */
    };

    return (
        <Modal
            title="Crear Resumen"
            message="Completa la información para tu resumen."
            onClose={onClose}
            footer={
                <button className="btn btn-primary" onClick={handleSave} disabled={!topic || !summary}>
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
            <div className="mb-3">
                <label className="form-label">Resumen:</label>
                <textarea
                    className="form-control"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Ingrese el resumen"
                />
            </div>
        </Modal>
    );
}
