import Link from "next/link";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import Modal from './modals/modal'

export default function LogIn() {
    const [email, setEmail] = useState<string>();
    const [pass, setPass] = useState<string>();
    const router = useRouter();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        axios.post('http://localhost:3001/IniciarSesion', { email, pass })
            .then(result => {
                if (result.data.message === "Sesión iniciada con éxito") {
                    localStorage.setItem('user_id', result.data.user_id);
                    router.push('/HomePage');
                } else {
                    setTitle("¡Error!");
                    setMessage("Correo y/o contraseña incorrecta.");
                    setShowModal(true);
                }
            })
            .catch((error) => {
                switch (error.response.data.error) {
                    case "Llene todos los campos de usuario.":
                        setTitle("¡Error!");
                        setMessage("Llene todos los campos del usuario.");
                        setShowModal(true);
                        break;
                    case "Usuario no encontrado en MongoDB":
                        setTitle("¡Error!");
                        setMessage("Correo y/o contraseña incorrectos.");
                        setShowModal(true);
                        break;
                    default:
                        setTitle("¡Error!");
                        setMessage("Error al iniciar sesión. Intenta nuevamente.");
                        setShowModal(true);
                        break;
                }
            });
    };

    return (
        <>
            <div className="container-grid">
                {/* Form */}
                <div className="form-section">
                    {/* Flecha */}
                    <div className="back position-absolute top-0 end-0 p-2">
                        <Link href="/">
                            <img src="images/atras.png" alt="Regresar" width="25" height="25" />
                        </Link>
                    </div>

                    <p className="LG_SUtitle text-center" >Iniciar Sesión</p>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
                                Correo Electrónico
                            </label>
                            <div className="col-sm-9">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail3"
                                    onChange={(input) => setEmail(input.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">
                                Contraseña
                            </label>
                            <div className="col-sm-9">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword3"
                                    onChange={(input) => setPass(input.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn-outline2 btn" type="submit">
                                Iniciar Sesión
                            </button>
                        </div>
                        <div className="redireccionamiento">
                            <p>¿No tienes una cuenta? </p>
                            <Link href="/Registro" className="textColor"> Haz click aquí para registrarte.</Link>

                        </div>
                    </form>

                </div >

                {/* Imagen */}
                < div className="image" >
                    <div className="overlay ovl2">
                        <p className="title2">Bienvenido a</p>
                        <p className="title">LEARN CONNECT</p>
                        <p className="text">Inicia Sesión para acceder a tu cuenta.</p>
                    </div>
                    <img src="images/Fondo5.jpg" alt="Iniciar Sesión" width="100%" height="100%" />
                </div >

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