import { useState, useEffect } from "react";
import SideBar from "./modals/SideBar";

export default function Recursos() {
    useEffect(() => {
        const initBootstrap = async () => {
            await import('bootstrap');
        };
        initBootstrap();
    }, []);

    return (
        <div className="container-fluid m-0 p-0">
            <div className="row m-0 p-0">
                <aside className="col-md-3 col-lg-3 sticky-top">
                    <SideBar />
                </aside>
                <main id="mainR" className="col-md-9 ms-sm-auto col-lg-9" style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
                    <nav id="home-header" className="navbar navbar-light bg-light d-md-none">
                        <div className="container-fluid">
                            <button className="navbar-toggler"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#sidebarMenu"
                                aria-controls="sidebarMenu"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <span className="navbar-brand mb-0 h1 ibm-plex-sans-pSans">Recursos</span>
                        </div>
                    </nav>

                    <section id="recursos" className="pt-6 ibm-plex-sans-pSans">
                        <h2>Mis Recursos</h2>
                        <p>Lista de recursos guardados aquí.</p>
                    </section>
                </main>
            </div>
        </div>
    );
}
