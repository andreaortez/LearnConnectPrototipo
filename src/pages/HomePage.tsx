import Link from "next/link";
import { useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import SideBar from "./modals/SideBar";

export default function HomePage (){
    const router = useRouter();
    useEffect(() => {
        const initBootstrap = async () => {
          await import('bootstrap');
        };
        initBootstrap();
      }, []);
      
    return (
        <div className="container-fluid ">

        <div className="row ">
            <aside className="col-md-3 col-lg-3 sticky-top">
                <SideBar />
            </aside>   
            <main id="main" className="col-md-9 ms-sm-auto col-lg-9 px-md-4">
                <nav id="home-header" className="navbar navbar-light bg-light d-md-none">
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
                    <span className="navbar-brand mb-0 h1">Homepage</span>
                    </div>
                </nav>   
                    <section id="landing" className="pt-3">
                        <h2>Bienvenido a LearnConnect</h2>
                    </section>
                    <section id="actividades" className="pt-3">
                        <h2>Actividades</h2>
                        <p>Sube tus archivos o anotaciones para estudiar con nuestros juegos, examenes y flashcards
                            generadas con IA!
                        </p>
                    </section>
                    
                
            </main>
        
        </div>
    </div>
    );

};