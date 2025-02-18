import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface SummaryModalProps {
  data: { summary: string };
  onClose: () => void;
  onNextActivity?: () => void;
}

export default function SummaryModal({ data, onClose, onNextActivity }: SummaryModalProps) {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Simular la carga del resumen desde el backend
  useEffect(() => {
    if (data && data.summary) {
      setSummary(data.summary);
      setLoading(false);
    } else {
      setError('No se pudo cargar el resumen.');
      setLoading(false);
    }
  }, [data]);

  const handlePrint = () => {
    window.print();
  };

  const handleNextActivity = () => {
    if (onNextActivity) {
      onNextActivity();
    } else {
      onClose();
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
            <h5 className="modal-title">Resumen de Estudio</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando resumen...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <div className="summary-content">
                {summary.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
            <button className="btn btn-verde" onClick={handlePrint}>
              Imprimir Resumen
            </button>
            {onNextActivity && (
              <button className="btn btn-success" onClick={handleNextActivity}>
                Siguiente Actividad
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}