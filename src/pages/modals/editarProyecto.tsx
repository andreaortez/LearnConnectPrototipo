import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../modals/modal'

interface Proyecto {
    project_id: string;
    nombre: string;
    imagen: string;
    sector: string;
    meta: number;
    descripcion: string;
    onClose: () => void;
}

export default function EditarProyecto({ project_id, nombre, imagen, sector, meta, descripcion, onClose }: Proyecto) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const [formData, setFormData] = useState({
        nombre, imagen, sector, meta, descripcion
    });

    useEffect(() => {
        setFormData({ nombre, imagen, sector, meta, descripcion });
    }, [nombre, imagen, sector, meta, descripcion]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSaveChanges = () => {
        if (project_id) {
            axios.put('http://localhost:3001/Proyecto', {
                project_id,
                ...formData,
            })
                .then(result => {
                    onClose();
                    setTitle('¡Éxito!');
                    setMessage("Su usuario se ha editado correctamente.");
                    setShowModal(true);
                })
                .catch(error => {
                    console.error("Error al guardar cambios:", error);
                    onClose();
                    setTitle('¡Error!');
                    setMessage('Ocurrió un problema al editar su usuario. Inténtalo nuevamente.');
                    setShowModal(true);
                });
        }
    };


    return (
        <>
            <div className="modal show d-block" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Proyecto</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3 needs-validation" noValidate>
                                <div className='hstack p-4'>
                                    {/* imagen */}
                                    <div className='d-flex me-4 flex-column align-items-center justify-content-center text-center'>
                                        <h6 className="card-title mb-4">Imagen del Proyecto</h6>
                                        <div className="mb-3 mt-3">
                                            <label htmlFor="imagen" className="form-label">Copiar link de la imagen</label>
                                            <input type="text" id="imagen" className="form-control mb-4" value={formData.imagen} onChange={handleInputChange} />
                                        </div>
                                    </div>


                                    {/* informacion */}
                                    <div className='vstack border-start'>
                                        <div className='ms-4'>
                                            <div className="row mb-3 align-items-center">
                                                <div className="col-md-6">
                                                    <label htmlFor="nombre" className="form-label">Título</label>
                                                    <input type="text" className="form-control" id="nombre" value={formData.nombre} onChange={handleInputChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="meta" className="form-label">Meta</label>
                                                    <input type="text" className="form-control" id="meta" value={formData.meta} onChange={handleInputChange} required />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="descripcion" className="form-label mb-3">Descripción</label>
                                                <textarea className="form-control" id="descripcion" rows={4} value={formData.descripcion} onChange={handleInputChange} required />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="sector" className="form-label mb-3">Sector</label>
                                                <select className="form-select" id="sector" value={formData.sector} onChange={handleInputChange} required>
                                                    <option value="" disabled>Elija Sector...</option>
                                                    <option>Economía</option>
                                                    <option>Salud</option>
                                                    <option>Educación</option>
                                                    <option>Agrícola</option>
                                                    <option>Ganadería</option>
                                                    <option>Finanzas</option>
                                                    <option>Tecnología</option>
                                                    <option>Arte</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-3">
                                    <button type="button" className="btn btn2" onClick={handleSaveChanges}>
                                        Editar Proyecto
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && <Modal title={title} message={message} onClose={() => setShowModal(false)} />}
        </>
    );
};