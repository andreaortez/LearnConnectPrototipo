import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './modal';

interface Parametros {
    project_id: string;
    investor_id: string;
    onClose: () => void;
}

export default function Propuesta({ project_id, investor_id, onClose }: Parametros) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const [roi, setRoi] = useState<string>('');
    const [monto, setMonto] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === "ROI") {
            setRoi(value);
        } else if (id === "monto") {
            setMonto(value);
        }
    };

    const crearPropuesta = async () => {
        if (investor_id) {
            try {
                console.log("investor_id desde sessionStorage:", investor_id);

                const response = await axios.post('http://localhost:3001/Propuesta', {
                    investor_id: investor_id,
                    project_id: project_id,
                    roi: roi,
                    monto: monto

                }).then(response => {
                    console.log("exito");
                    // Éxito
                    setTitle('¡Éxito!');
                    setMessage("¡La propuesta se realizó correctamente!");
                    setShowModal(true);
                });
            } catch (error) {
                setTitle('¡Error!');
                setMessage('Ocurrió un problema al realizar la propuesta. Inténtalo nuevamente.');
                setShowModal(true);
            }
        } else {
            setTitle('Error de identificación');
            setMessage('No se encontró un ID válido para el inversionista.');
            setShowModal(true);
        }
    }

    return (
        <>
            <div className="modal show d-block" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Realizar Propuesta</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="ROI" className="col-form-label">
                                    ROI
                                </label>
                                <input type="text" className="form-control mb-3" id="ROI" value={roi} onChange={handleInputChange} required />

                                <label htmlFor="monto" className="col-sm-3 col-form-label">
                                    Monto a invertir
                                </label>
                                <input type="text" className="form-control mb-3" id="monto" value={monto} onChange={handleInputChange} required />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" onClick={crearPropuesta}>Enviar Propuesta</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && <Modal title={title} message={message} onClose={() => { onClose(); setShowModal(false); }} />}
        </>
    );
};