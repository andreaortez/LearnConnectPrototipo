import { useEffect, useState } from "react";
import SideBar from "./modals/SideBar";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

interface Summary {
    _id: string;
    title: string;
    summary: string;
}

interface Flashcard {
    _id: string;
    flashcards: { word: string; definition: string }[];
}

interface Exam {
    _id: string;
    title: string;
    questions: { question: string; option1: string; option2: string; option3: string; option4: string; rightAnswer: number }[];
}

export default function Recursos() {
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [exams, setExams] = useState<Exam[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [isPremium, setIsPremium] = useState(true);

    useEffect(() => {
        const initBootstrap = async () => {
            await import('bootstrap');
        };
        initBootstrap();
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem("user_id");
            if (storedUserId) {
                setUserId(storedUserId);
            } else {
                console.error("User ID not found in localStorage!");
            }
        }
    }, []);

    useEffect(() => {
       
        if (!userId) return; 
        console.log("User ID:", userId);

        const fetchResources = async () => {
            try {
                const [summariesRes, flashcardsRes, examsRes] = await Promise.all([
                    axios.get("http://localhost:3001/getSummaries", { params: { id: userId } }),
                    axios.get("http://localhost:3001/getFlashcards", { params: { id: userId } }),
                    axios.get("http://localhost:3001/getExams", { params: { id: userId } })
                ]);

                console.log("Summaries Response:", summariesRes.data);
                console.log("Flashcards Response:", flashcardsRes.data);
                console.log("Exams Response:", examsRes.data);

                setSummaries(summariesRes.data.resultado || []);
                setFlashcards(flashcardsRes.data.resultado || []);
                setExams(examsRes.data.resultado || []);

            } catch (error) {
                console.error("Error fetching resources:", error);
            }finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, [userId]);

    

    const openSummary = async (summaryID: string) => {
        if (!userId) {
            console.error("User ID not found!");
            return;
        }

        try {
            const response = await axios.get("http://localhost:3001/getSummary", {
                params: { id: userId, item_id: summaryID },
            });
            sessionStorage.setItem("summary", "true");
            sessionStorage.setItem("summaryData", JSON.stringify(response.data.resultado[0]))
            router.push("/Actividades");
        } catch (error) {
            console.error("Error fetching resources:", error);
        } finally {
            setLoading(false);
        }
    };

    const openExam = async (examID: string) => {
        if (!userId) {
            console.error("User ID not found!");
            return;
        }

        try {
            
                const response = await axios.get("http://localhost:3001/getExam", {
                    params: { id: userId, item_id: examID },
                });
                sessionStorage.setItem("exam", "true");
                sessionStorage.setItem("examData", JSON.stringify(response.data.resultado))
                router.push("/Actividades");
        
        } catch (error) {
            console.error("Error fetching resources:", error);
        } finally {
            setLoading(false);
        }
    };

    const openFlashcard = async (examID: string) => {
        if (!userId) {
            console.error("User ID not found!");
            return;
        }

        try {
            const response = await axios.get("http://localhost:3001/getFlashcard", {
                params: { id: userId, item_id: examID },
            });
            sessionStorage.setItem("flashcard", "true");
            sessionStorage.setItem("flashcardData", JSON.stringify(response.data.resultado))
            router.push("/Actividades");
        } catch (error) {
            console.error("Error fetching resources:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid m-0 p-0">
            <div className="row m-0 p-0">
                <aside className="col-lg-3 sticky-top d-lg-block d-md-none">
                    <SideBar />
                </aside>
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
                        <span className="navbar-brand mb-0 h1 ibm-plex-sans-pSans">Recursos</span>
                    </div>
                </nav>
                <main id="mainR" className="col-12 col-lg-9 ms-sm-auto 100vw" style={{ minHeight: '100vh' }}>
                
                    <section id="recursosNav" className="py-4 px-4 rounded bg-teal-500 text-white shadow-sm">
                        <h2 className="font-bold mt-2">Mis Recursos</h2>
                        <p>Lista de recursos guardados aquí.</p>
                    </section>

                    {loading ? (
                        <div className="text-center mt-5">Cargando recursos...</div>
                    ) : (
                        <>
                            <section className="mt-4 p-3 bg-white rounded shadow-sm">
                                <h5 className="text-teal-700 font-bold border-bottom pb-2">📄 Flashcards</h5>
                                <div className="resource-grid">
                                    {flashcards.length > 0 ? (
                                    flashcards.map((item) => (
                                        <div
                                        key={item._id}
                                        className="resource-item"
                                        onClick={() => openFlashcard(item._id)}
                                        >
                                        <Image src="/images/flashcard.png" alt="flashcard" width={60} height={60} />
                                        <p className="resource-title">Flashcard Set</p>
                                        </div>
                                    ))
                                    ) : (
                                    <p className="text-muted text-center w-100">No hay flashcards guardadas.</p>
                                    )}
                                </div>
                                </section>

                                <section className="mt-4 p-3 bg-white rounded shadow-sm">
                                <h5 className="text-teal-700 font-bold border-bottom pb-2">📑 Resúmenes</h5>
                                <div className="resource-grid">
                                    {summaries.length > 0 ? (
                                    summaries.map((item) => (
                                        <div
                                        key={item._id}
                                        className="resource-item"
                                        onClick={() => openSummary(item._id)}
                                        >
                                        <Image src="/images/summary.png" alt="summary" width={60} height={60} />
                                        <p className="resource-title">{item.title}</p>
                                        </div>
                                    ))
                                    ) : (
                                    <p className="text-muted text-center w-100">No hay resúmenes guardados.</p>
                                    )}
                                </div>
                                </section>

                                <section className="mt-4 p-3 bg-white rounded shadow-sm">
                                <h5 className="text-teal-700 font-bold border-bottom pb-2">📝 Exámenes</h5>
                                <div className="resource-grid">
                                    {exams.length > 0 ? (
                                    exams.map((item) => (
                                        <div
                                        key={item._id}
                                        className="resource-item"
                                        onClick={() => openExam(item._id)}
                                        >
                                        <Image src="/images/exam.png" alt="exam" width={60} height={60} />
                                        <p className="resource-title">{item.title}</p>
                                        </div>
                                    ))
                                    ) : (
                                    <p className="text-muted text-center w-100">No hay exámenes guardados.</p>
                                    )}
                                </div>
                                </section>

                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

