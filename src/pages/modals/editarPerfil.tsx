import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../modals/modal'

interface User {
    nombre: string;
    correo: string;
    rol: string;
    apellido: string;
    telefono: string;
    direccion: string;
    avatar: string;
    onClose: () => void;
}

export default function EditarPerfil({ nombre, correo, rol, apellido, telefono, direccion, avatar, onClose }: User) {
    const user_id = sessionStorage.getItem("user_id");

    const [formData, setFormData] = useState({
        nombre,
        correo,
        rol,
        apellido,
        telefono,
        direccion,
        avatar,
    });

    useEffect(() => {
        setFormData({ nombre, correo, rol, apellido, telefono, direccion, avatar });
    }, [nombre, correo, rol, apellido, telefono, direccion, avatar]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const [showModal, setShowModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSaveChanges = () => {
        if (user_id) {
            try {
                axios.put('http://localhost:3001/User', {
                    user_id,
                    ...formData,
                })
                    .then(result => {
                        sessionStorage.setItem("nombre", result.data.nombre);
                        sessionStorage.setItem("apellido", result.data.apellido);
                        sessionStorage.setItem("rol", result.data.rol);
                        sessionStorage.setItem("avatar", result.data.avatar);
                        onClose();
                        setShowModal(true);
                        setTitle('¡Éxito!');
                        setMessage("Su usuario se ha editado correctamente.");
                        //window.location.reload();
                        setTimeout(onClose, 3000);
                    })
            } catch (error) {
                setTitle('¡Error!');
                setMessage('Ocurrió un problema al editar su usuario. Inténtalo nuevamente.');
                setShowModal(true);
            }
        }
    };

    return (
        <>
            <div className="modal fade show d-block " tabIndex={-1} data-bs-backdrop="static" onClick={() => setShowModal(false)}>
                <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Mi Perfil</h1>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3 needs-validation" noValidate>
                                <div className='hstack gap-4 p-4'>
                                    {/* imagen */}
                                    <div className='border-end d-flex flex-column align-items-center justify-content-center text-center'>
                                        <img
                                            src={formData.avatar}
                                            alt="User Avatar"
                                            className="rounded-circle mb-3 mt-3 border"
                                            width="120"
                                            height="120"
                                        />
                                        <div className="mb-3 me-4">
                                            <label htmlFor="avatar" className="form-label">Copiar link de la imagen</label>
                                            <input type="text" id="avatar" className="form-control mb-4" value={formData.avatar} onChange={handleInputChange} />
                                        </div>
                                    </div>

                                    {/* informacion */}
                                    <div>
                                        <div className='row '>
                                            <div className='col'>
                                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                                <input type="text" id="nombre" className="form-control mb-4" value={formData.nombre} onChange={handleInputChange} />

                                                <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                                                <input type="email" id="correo" className="form-control mb-4" value={formData.correo} onChange={handleInputChange} />

                                                <label htmlFor="rol" className="form-label">Rol</label>
                                                <input type="text" id="rol" className="form-control" value={formData.rol} onChange={handleInputChange} />
                                            </div>
                                            <div className='col'>
                                                <label htmlFor="apellido" className="form-label">Apellido</label>
                                                <input type="text" id="apellido" className="form-control mb-4" value={formData.apellido} onChange={handleInputChange} />

                                                <label htmlFor="telefono" className="form-label">Número de Teléfono</label>
                                                <input type="text" id="telefono" className="form-control mb-4" value={formData.telefono} onChange={handleInputChange} />

                                                <label htmlFor="direccion" className="form-label">Dirección</label>
                                                <input type="text" id="direccion" className="form-control" value={formData.direccion} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer gap-2">
                            <button type="button"
                                className="btn btn-secondary"
                                onClick={onClose}>
                                Cerrar
                            </button>
                            <button type="button"
                                className="btn btn2"
                                onClick={handleSaveChanges}>
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div >

            {/* Modal */}
            {showModal && <Modal title={title} message={message} onClose={() => setShowModal(false)} />}
        </>
    );
};