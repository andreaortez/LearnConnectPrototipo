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

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
            console.error("User ID not found!");
            return;
        }

        const fetchResources = async () => {
            try {
                const [summariesRes, flashcardsRes, examsRes] = await Promise.all([
                    axios.get("http://localhost:3001/getSummaries", { params: { id: userId } }),
                    axios.get("http://localhost:3001/getFlashcards", { params: { id: userId } }),
                    axios.get("http://localhost:3001/getExams", { params: { id: userId } })
                ]);

                setSummaries(summariesRes.data.resultado || []);
                setFlashcards(flashcardsRes.data.resultado || []);
                setExams(examsRes.data.resultado || []);

            } catch (error) {
                console.error("Error fetching resources:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    return (
        <div className="container-fluid m-0 p-0">
            <div className="row m-0 p-0">
                <aside className="col-md-3 col-lg-3 sticky-top" style={{ zIndex: 1040 }}>
                    <SideBar />
                </aside>

                <main id="mainR" className="col-md-9 ms-sm-auto" style={{ minHeight: '100vh' }}>
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
                                <div className="d-flex gap-4 flex-wrap">
                                    {flashcards.length > 0 ? (
                                        flashcards.map((item) => (
                                            <div key={item._id} className="p-3 text-center rounded-lg hover:shadow-md transition"
                                                onClick={() => router.push(`/flashcards/${item._id}`)} style={{ cursor: "pointer" }}>
                                                <Image src="/images/flashcard.png" alt="flashcard" width={60} height={60} />
                                                <p className="mt-2 text-gray-700 font-medium">Flashcard Set</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted">No hay flashcards guardadas.</p>
                                    )}
                                </div>
                            </section>
                            <section className="mt-4 p-3 bg-white rounded shadow-sm">
                                <h5 className="text-teal-700 font-bold border-bottom pb-2">📑 Resúmenes</h5>
                                <div className="d-flex gap-4 flex-wrap">
                                    {summaries.length > 0 ? (
                                        summaries.map((item) => (
                                            <div key={item._id} className="p-3 text-center rounded-lg hover:shadow-md transition"
                                                onClick={() => router.push(`/summary/${item._id}`)} style={{ cursor: "pointer" }}>
                                                <Image src="/images/summary.png" alt="summary" width={60} height={60} />
                                                <p className="mt-2 text-gray-700 font-medium text-truncate"
                                                    style={{ maxWidth: "120px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                    {item.title}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted">No hay resúmenes guardados.</p>
                                    )}
                                </div>
                            </section>
                            <section className="mt-4 p-3 bg-white rounded shadow-sm">
                                <h5 className="text-teal-700 font-bold border-bottom pb-2">📝 Exámenes</h5>
                                <div className="d-flex gap-4 flex-wrap">
                                    {exams.length > 0 ? (
                                        exams.map((item) => (
                                            <div key={item._id} className="p-3 text-center rounded-lg hover:shadow-md transition"
                                                onClick={() => router.push(`/exam/${item._id}`)} style={{ cursor: "pointer" }}>
                                                <Image src="/images/exam.png" alt="exam" width={60} height={60} />
                                                <p className="mt-2 text-gray-700 font-mediumtext-truncate"
                                                    style={{ maxWidth: "120px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                    {item.title}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted">No hay exámenes guardados.</p>
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

