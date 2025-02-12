import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import Modal from './modals/modal'

export default function SignUp() {
    const router = useRouter();
    //User Data
    const [correo, setCorreo] = useState<string>();
    const [contraseña, setContraseña] = useState<string>();
    const [nombre, setNombre] = useState<string>();
    const [apellido, setApellido] = useState<string>();
    const [edad, setEdad] = useState<string>();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        axios.post('http://localhost:3001/Registrarse', { email: correo, pass: contraseña, nombre, apellido, edad })
            .then(result => {
                if (result.data.result === "success") {
                    localStorage.setItem('user_id', result.data.user_id);
                    router.push('/HomePage');
                }
            })
            .catch((error) => {
                console.log(error)
                setTitle("¡Error!");
                setMessage("Error al registrarse. Intente de nuevo.");
                setShowModal(true);
            });
    };
    return (
        <>
            <div className="container-grid">
                {/* Imagen */}
                <div className="image">
                    <div className="overlay ovl2">
                        <p className="title">¿Eres nuevo aquí?</p>
                        <p className="text">¡Regístrate y descubre nuevas oportunidades!</p>
                    </div>
                    <img src="images/Fondo5.jpg" alt="Crear Cuenta" />
                </div>

                {/* Form */}
                <div className="form-section">
                    <div className=" float-end">
                        {/* Flecha */}
                        <div className="back position-absolute top-0 p-2">
                            <Link href="/">
                                <img src="images/atras.png" alt="Regresar" width="25" height="25" />
                            </Link>
                        </div>

                        <p className="LG_SUtitle text-center">Crear Cuenta</p>
                        <form onSubmit={handleSubmit} className="center p-4">
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label htmlFor="Nombre" className="form-label">Nombre</label>
                                    <input
                                        onChange={(input) => setNombre(input.target.value)}
                                        type="text" className="form-control" aria-label="Nombre" required />
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="Apellido" className="form-label">Apellido</label>
                                    <input
                                        onChange={(input) => setApellido(input.target.value)}
                                        type="text" className="form-control" aria-label="Apellido" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label htmlFor="Correo" className="form-label">Correo electrónico</label>
                                    <input
                                        onChange={(input) => setCorreo(input.target.value)}
                                        type="email" className="form-control" aria-label="Correo" required />
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="Contraseña" className="form-label">Contraseña</label>
                                    <input
                                        onChange={(input) => setContraseña(input.target.value)}
                                        type="password" className="form-control" aria-label="Contraseña" required />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-6 mb-4">
                                    <label htmlFor="Edad" className="form-label">Edad</label>
                                    <input
                                        onChange={(input) => setEdad(input.target.value)}
                                        type="number" className="form-control" aria-label="Edad" required />
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn-outline2 btn" type="submit">
                                    Registrarse
                                </button>
                            </div>

                            <div className="redireccionamiento">
                                <p>¿Ya tienes una cuenta? </p>
                                <Link href="/IniciarSesion" className="textColor"> Haz click aquí para iniciar sesión.</Link>
                            </div>
                        </form >
                    </div >
                </div>

                {/* Modal */}
                {showModal && <Modal title={title} message={message}
                    onClose={() => setShowModal(false)}
                    footer={
                        <button
                            type="button"
                            className="btn btn-secondary btn-outline2"
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            Cerrar
                        </button>} />}
            </div>
        </>
    );
};