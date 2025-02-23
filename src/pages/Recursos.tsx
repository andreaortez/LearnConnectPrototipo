import { useEffect } from "react";
import SideBar from "./modals/SideBar";
import Image from "next/image"; 

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
                {/* Main Content */}
                <main id="mainR" className="col-md-9 ms-sm-auto col-lg-9 bg-gray-100" style={{ minHeight: '100vh' }}>
                    <section id="recursosNav" className="py-4 px-4 rounded bg-teal-500 text-white shadow-sm">
                        <h2 className="font-bold  mt-2"> Mis Recursos</h2>
                        <p className="">Lista de recursos guardados aquí.</p>
                    </section>           
                    
                    <section className="mt-4 p-3 bg-white rounded-lg shadow-sm">
                        <h5 className="text-teal-700 font-bold border-bottom pb-2">📄 Flashcards</h5>
                        <div className="d-flex gap-4 flex-wrap">
                            {["flashcard1", "flashcard2"].map((item, index) => (
                                <div key={index} className="p-3 text-center rounded-lg hover:shadow-md transition">
                                    <Image src="/images/flashcard.png" alt={item} width={60} height={60} />
                                    <p className="mt-2 text-gray-700 font-medium">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="mt-4 p-3 bg-white rounded-lg shadow-sm">
                        <h5 className="text-teal-700 font-bold border-bottom pb-2">📑 Resúmenes</h5>
                        <div className="d-flex gap-4 flex-wrap">
                            {["resumen1", "resumen2"].map((item, index) => (
                                <div key={index} className="p-3 text-center rounded-lg hover:shadow-md transition">
                                    <Image src="/images/summary.png" alt={item} width={60} height={60} />
                                    <p className="mt-2 text-gray-700 font-medium">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="mt-4 p-3 bg-white rounded-lg shadow-sm">
                        <h5 className="text-teal-700 font-bold border-bottom pb-2">📝 Exámenes</h5>
                        <div className="d-flex gap-4 flex-wrap">
                            {["examen1", "examen2"].map((item, index) => (
                                <div key={index} className="p-3 text-center rounded-lg hover:shadow-md transition">
                                    <Image src="/images/exam.png" alt={item} width={60} height={60} />
                                    <p className="mt-2 text-gray-700 font-medium">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
