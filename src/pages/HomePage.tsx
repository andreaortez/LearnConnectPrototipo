import { useState, useEffect } from "react";
import SideBar from "./modals/SideBar";
import UploadModal from "./modals/UploadModal";


export default function HomePage() {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const handleUpload = (files: any) => {
        console.log("Uploaded files:", files);
        setShowUploadModal(false);
    };


    useEffect(() => {
        const initBootstrap = async () => {
            await import('bootstrap');
        };
        initBootstrap();
    }, []);

    return (
        <div className="container-fluid m-0 p-0">
            <div className="row m-0 p-0">
                <aside className="col-lg-3 sticky-top d-lg-block d-md-none">
                    <SideBar />
                </aside>
                <main id="main" className="col-12 col-lg-9 ms-sm-auto" style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
                    <nav id="home-header" className="navbar navbar-light bg-light d-lg-none">
                        <div className="container-fluid">
                            <button className="navbar-toggler"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#sidebarMenu"
                                aria-controls="sidebarMenu"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <span className="navbar-brand mb-0 h1 ibm-plex-sans-pSans">Homepage</span>
                        </div>
                    </nav>
                    <section id="landing" className="bm-plex-sans-pSans"
                        style={{
                            backgroundImage: 'url("/images/banner.png")',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            minHeight: '300px'
                        }}
                    >
                        <h1>¡Bienvenido a LearnConnect!</h1>
                    </section>
                    <section id="actividades" className="pt-6 ibm-plex-sans-pSans">
                        <h2>Actividades</h2>
                        <p className="p-1">Sube tus archivos o anotaciones para estudiar con nuestros resúmenes, exámenes y flashcards
                            generadas con IA!
                        </p>
                        <button className="btn btn-act" onClick={() => setShowUploadModal(true)}>Subir anotaciones</button>

                    </section>
                    {showUploadModal && (
                        <UploadModal
                            onClose={() => setShowUploadModal(false)}
                            onFileUpload={handleUpload} />
                    )}
                </main>
            </div>
        </div>
    );
};
