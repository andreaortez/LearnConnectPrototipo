import { useEffect,useState} from "react";
import { useRouter } from 'next/router';
import SideBar from "./modals/SideBar";

type OptionKeys = "flashcards" | "resumen" | "examenPractica";

interface OptionsState {
  flashcards: boolean;
  resumen: boolean;
  examenPractica: boolean;
}

export default function HomePage (){
    const router = useRouter();
    const [showOptions, setShowOptions] = useState(false);
     const [selectedOptions, setSelectedOptions] = useState<OptionsState>({
        flashcards: false,
        resumen: false,
        examenPractica: false,
      });
      
      useEffect(() => {
        const initBootstrap = async () => {
          await import('bootstrap');
        };
        initBootstrap();
      }, []);
      
      const toggleOption = (option: OptionKeys) => {
        setSelectedOptions((prev) => ({
          ...prev,
          [option]: !prev[option],
        }));
        console.log(selectedOptions);
      };

      const handleButtonClick = () => {
        setShowOptions(true);
      };
    
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
                    <span className="navbar-brand mb-0 h1 ibm-plex-sans-pSans">Homepage</span>
                    </div>
                </nav>   
                    <section id="landing" className="pt-3 ibm-plex-sans-pSans"
                    style={{ 
                        backgroundImage: 'url("/images/banner.png")', 
                        backgroundSize: 'cover', 
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        minHeight: '300px' 
                      }}
                    >
                        <h1>Bienvenido a LearnConnect</h1>
                    </section>
                    <section id="actividades" className="pt-6 ibm-plex-sans-pSans">
                        <h2>Actividades</h2>
                        <p className="">Sube tus archivos o anotaciones para estudiar con nuestros juegos, examenes y flashcards
                            generadas con IA!
                        </p>
                        <button className="btn btn-act" onClick={handleButtonClick}>Subir anotaciones</button>
                        {showOptions && (
                            <div id="btngroup1" className="fade-in m-3 ">  
                                <h5>Generar:</h5>                     
                                <button
                                    className={`btn btn-tipo m-2 ${selectedOptions.flashcards ? "btn-selected" : "btn-tipo"}`}
                                    onClick={() => toggleOption("flashcards")}
                                >
                                    Flashcards
                                </button>
                                <button
                                    className={`btn btn-tipo m-2 ${selectedOptions.resumen ? "btn-selected" : "btn-tipo"}`}
                                    onClick={() => toggleOption("resumen")}
                                >
                                    Resumen
                                </button>
                                <button
                                    className={`btn btn-tipo m-2 ${selectedOptions.examenPractica ? "btn-selected" : "btn-tipo"}`}
                                    onClick={() => toggleOption("examenPractica")}
                                >
                                    Examen de Practica
                                </button>
                                <div></div>
                                {(selectedOptions.flashcards || selectedOptions.resumen || selectedOptions.examenPractica) && (
                                    <button className="btn btn-act mt-4" onClick={() => router.push("/subir-recursos")}>
                                        Continuar  →
                                    </button>
                                )}
                            </div>
                          )}
                                               
                    </section>
                    
                
            </main>
        
        </div>
    </div>
    );

};