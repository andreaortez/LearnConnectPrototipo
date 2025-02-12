import { useState } from "react";
import { useRouter } from 'next/router';
import SideBar from "./modals/SideBar";

type OptionKeys = "flashcards" | "resumen" | "examenPractica";

interface OptionsState {
    flashcards: boolean;
    resumen: boolean;
    examenPractica: boolean;
}
interface Flashcard {
    topic: string;
    question: string;
    answer: string;
}

interface Exam {
    topic: string;
    questions: { question: string; correctAnswer: string; }[];
}

interface Summary {
    topic: string;
    summary: string;
}
interface Resource {

    type: 'flashcard' | 'summary' | 'practiceExam';
    content: any;
}

export default function HomePage() {
    const router = useRouter();
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<OptionsState>({
        flashcards: false,
        resumen: false,
        examenPractica: false,
    });

    const [showGeneratedContent, setShowGeneratedContent] = useState(false);
    const [savedResources, setSavedResources] = useState<Resource[]>([]);
    const key: keyof Resource = 'content';

    const sampleFlashcards: Flashcard[] = [
        { topic: "Cálculo Integral", question: "¿Qué es una integral definida?", answer: "Es una integral con límites superiores e inferiores que da como resultado un número real." },
        { topic: "Historia de Honduras", question: "¿En qué año se independizó Honduras?", answer: "Honduras se independizó en 1821." },
        { topic: "Anatomía del Cuerpo Humano", question: "¿Cuál es el órgano más grande del cuerpo humano?", answer: "La piel es el órgano más grande del cuerpo humano." },
    ];

    const sampleSummary: Summary = {
        topic: "Historia de Honduras",
        summary: "Período Precolombino Honduras fue habitada por diversas culturas indígenas, siendo la civilización maya la más destacada. Los mayas establecieron ciudades como Copán, reconocida por sus monumentos y estelas que evidencian su avanzada arquitectura y escritura. Además de los mayas, otros grupos como los lencas, tol, pech y sumos habitaron diferentes regiones del país. Colonización Española (1524-1821) En 1524, los conquistadores españoles, liderados por Cristóbal de Olid y posteriormente por Hernán Cortés, iniciaron la colonización de Honduras. Durante este período, la economía se centró en la minería, especialmente de oro y plata, y en la agricultura. Las ciudades de Comayagua y Tegucigalpa se establecieron como centros administrativos y económicos. La población indígena sufrió una drástica disminución debido a enfermedades, trabajo forzado y conflictos con los colonizadores. Independencia y Primeras Décadas Republicanas (1821-1870) Honduras proclamó su independencia de España el 15 de septiembre de 1821, uniéndose brevemente al Imperio Mexicano y luego a las Provincias Unidas de Centroamérica. Tras la disolución de la federación centroamericana en 1839, Honduras se estableció como una república independiente. Durante este período, el país enfrentó conflictos internos y externos, incluyendo disputas territoriales con naciones vecinas y luchas por la consolidación del Estado.  Era de las 'Repúblicas Bananeras' (1870-1930) A finales del siglo XIX y principios del XX, Honduras experimentó una creciente influencia de empresas estadounidenses, especialmente en la producción y exportación de banano. Estas compañías, como la United Fruit Company, tuvieron un impacto significativo en la economía y la política del país, a menudo en detrimento de los intereses nacionales."
    };

    const sampleExam: Exam = {
        topic: "Cálculo Integral",
        questions: [
            { question: "¿Cuál es la integral de x^2?", correctAnswer: "(1/3)x^3 + C" },
            { question: "¿Cuál es el determinante de la matriz [[2, 3], [1, 4]]?", correctAnswer: "5" },
            { question: "¿Cómo se calcula la suma de los primeros n términos de una progresión aritmética?", correctAnswer: "S_n = n/2 * (a_1 + a_n)" }, 
            { question: "¿Cuál es la derivada de 3x^4?", correctAnswer: "12x^3" },
            { question: "¿Qué valor tiene la suma de los primeros 5 números primos?", correctAnswer: "28" }
        ]
    };

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

    const handleSaveResources = (sampleExam: Exam) => {

        const newResource: Resource[] = [];
        if (selectedOptions.flashcards) {
            newResource.push({ type: 'flashcard', content: sampleFlashcards });
        }
        if (selectedOptions.resumen) {
            newResource.push({ type: 'summary', content: sampleSummary });
        }
        if (selectedOptions.examenPractica) {
            newResource.push({ type: 'practiceExam', content: sampleExam });
        }
        setSavedResources(prev => [...prev, ...newResource]);
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
                        <p className="">Sube tus archivos o anotaciones para estudiar con nuestros juegos, exámenes y flashcards
                            generadas con IA!
                        </p>
                        <button className="btn btn-act" onClick={handleButtonClick}>Subir anotaciones</button>
                        {showOptions && (
                            <div id="btngroup1" className="fade-in m-3 ">
                                <h5>Generar:</h5>
                                <button className={`btn m-2 ${selectedOptions.flashcards ? "btn-selected" : "btn-tipo"}`} onClick={() => toggleOption("flashcards")}>Flashcards</button>
                                <button className={`btn m-2 ${selectedOptions.resumen ? "btn-selected" : "btn-tipo"}`} onClick={() => toggleOption("resumen")}>Resumen</button>
                                <button className={`btn m-2 ${selectedOptions.examenPractica ? "btn-selected" : "btn-tipo"}`} onClick={() => toggleOption("examenPractica")}>Examen de Práctica</button>
                                <div>

                                </div>
                                {(selectedOptions.flashcards || selectedOptions.resumen || selectedOptions.examenPractica) && (
                                    <button className="btn btn-act mt-4" onClick={() => setShowGeneratedContent(true)}>Continuar →</button>
                                )}
                            </div>
                            )}
                            {showGeneratedContent && (
                                
                            <div className="mt-4">
                                
                                {selectedOptions.flashcards && (
                                    <div>
                                        <section id="actividades" className="pt-6 ibm-plex-sans-pSans">
                                        <h3>Flashcards</h3>
                                        {sampleFlashcards.map((card, index) => (
                                            <div key={index} className="p-4 border rounded shadow">
                                                <h4>{card.topic}</h4>
                                                <p><strong>Pregunta:</strong> {card.question}</p>
                                                <p><strong>Respuesta:</strong> {card.answer}</p>
                                                
                                            </div>
                                        ))}
                                        </section>
                                    </div>
                                )}
                                

                                {selectedOptions.resumen && (
                                    <div>
                                        <section id="actividades" className="pt-6 ibm-plex-sans-pSans">
                                        <h3>Resumen</h3>
                                        <div className="p-4 border rounded shadow">
                                        
                                            <h4>{sampleSummary.topic}</h4>
                                            <p>{sampleSummary.summary}</p>
                                            
                                        </div>
                                        </section>
                                    </div>
                                    
                                )}
                                
                                {selectedOptions.examenPractica && (
                                    <div>
                                        <section id="actividades" className="pt-6 ibm-plex-sans-pSans">
                                        <h3>Examen de Práctica</h3>
                                        <div className="p-4 border rounded shadow">
                                            <h4>{sampleExam.topic}</h4>
                                            {sampleExam.questions.map((q, index) => (
                                                <div key={index}>
                                                    <p><strong>Pregunta:</strong> {q.question}</p>
                                                    <p><strong>Respuesta Correcta:</strong> {q.correctAnswer}</p>
                                                </div>
                                            ))}
                                            <button className="btn btn-save" onClick={() => handleSaveResources(sampleExam)}>Guardar en Mis Recursos</button>
                                        </div>
                                        </section>
                                    </div>
                                    
                                )}
                            </div>
                           
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};
