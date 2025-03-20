import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import ModalDetails from './modalDetails';

interface UploadModalProps {
  onClose: () => void;
  onFileUpload: (files: File[]) => void;
}

type OptionKeys = "flashcards" | "resumen" | "examenPractica";
interface UploadModalProps {
  onClose: () => void;
  onFileUpload: (files: File[]) => void;
}

export default function UploadModal({ onClose, onFileUpload }: UploadModalProps) {
  const isPremium = true; // en duro para probar funciones premium 
  const [dragging, setDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();
  const userId = localStorage.getItem("user_id");
  const [selectedOptions, setSelectedOptions] = useState<Record<OptionKeys, boolean>>({
    flashcards: false,
    resumen: false,
    examenPractica: false,
  });
  const [preguntas, setPreguntas] = useState(0);
  const [showConfigurations, setShowConfigurations] = useState(false);


  //atributos de las flashcards
  const [showModalF, setShowModalF] = useState<boolean>(false);
  const [tarjetas, setTarjetas] = useState(0);
  const [formato, setFormato] = useState<string>("");
  const [dificultad, setDificultad] = useState<string>("");

  //atributos del resumen
  const [showModalR, setShowModalR] = useState<boolean>(false);
  const [palabras, setPalabras] = useState(0);
  const [redaccion, setRedaccion] = useState<string>("");
  const [enfoque, setEnfoque] = useState<string>("");

  //atributos de los examenes
  const [showModalE, setShowModalE] = useState<boolean>(false);
  const [numeroPreguntas, setNumeroPreguntas] = useState(10);
  const [Ndificultad, setNdificultad] = useState<string>("");
  const tiposPreguntas = ["Opción Múltiple", "Verdadero/Falso", "Selección Única"];
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);

  const handleCheckboxChange = (tipo: string) => {
    setSeleccionadas((prev) =>
      prev.includes(tipo) ? prev.filter((item) => item !== tipo) : [...prev, tipo]
    );
  };
// para mostrar configuraciones premium a aplicar a los recursos
  const handleModalClose = () => {
    setShowConfigurations(true);
  };  

  const toggleOption = (option: OptionKeys) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log(files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleUploadAndGenerate = async () => {
    if (!userId) {
      console.error("User ID not found!");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      uploadedFiles.forEach((file) => formData.append("file", file));

      // Upload file to /api/upload
      const uploadResponse = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        },
      });

      const filePath = uploadResponse.data.path;
      console.log("File uploaded to:", filePath);

      const backendBaseURL = "http://localhost:3001";

      // guarda que optiones escogio el usuario en local storage
      sessionStorage.setItem("flashcard", selectedOptions.flashcards.toString());
      sessionStorage.setItem("summary", selectedOptions.resumen.toString());
      sessionStorage.setItem("exam", selectedOptions.examenPractica.toString());

      const requests = [];
      if (selectedOptions.resumen) {
        //para usuarios premium
        if (isPremium) {
          requests.push(
            axios.get(`${backendBaseURL}/createSummaryPremium`, {
              params: {
                path: filePath,
                id: userId,
                num: palabras, 
                estilo: redaccion, 
                enfoque: enfoque, 
              },
            }).then((res) => {
              const summaryObject = JSON.parse(res.data.summary.trim());
              sessionStorage.setItem("summaryData", JSON.stringify(summaryObject));              
              console.log("Premium Summary Generated");
            }).catch((err) => console.error("Summary Premium Error:", err))
          );
        } else {
          requests.push(
            axios.get(`${backendBaseURL}/createSummary`, {
              params: { path: filePath, id: userId }
            }).then((res) => {
              sessionStorage.setItem("summaryData", JSON.stringify(res.data.summary));
            }).catch((err) => console.error("Summary Error:", err))
          );
        }
      }
  
      if (selectedOptions.flashcards) {
        // para usuarios premium 
        if (isPremium) {
          requests.push(
            axios.get(`${backendBaseURL}/createFlashcardsPremium`, {
              params: {
                path: filePath,
                id: userId,
                num: tarjetas, 
                formato: formato, 
                dificultad: dificultad, 
              },
            }).then((res) => {
              sessionStorage.setItem("flashcardData", JSON.stringify(res.data.list));
              console.log("Premium Flashcards Generated");
            }).catch((err) => console.error("Flashcard Premium Error:", err))
          );
        } else {
          requests.push(
            axios.get(`${backendBaseURL}/createFlashcards`, {
              params: { path: filePath, id: userId }
            }).then((res) => {
              sessionStorage.setItem("flashcardData", JSON.stringify(res.data.list));
              console.log("Flashcards Generated");
            }).catch((err) => console.error("Flashcard Error:", err))
          );
        }
      }
      if (selectedOptions.examenPractica) {

        if (isPremium) {
          // para usuarios premium 
          requests.push(
            axios.get(`${backendBaseURL}/createExamenPremium`, {
              params: {
                path: filePath,
                id: userId,
                num: numeroPreguntas,
                dificultad: dificultad,
                multipleChoice: tiposPreguntas.includes("Selección Única"),
                multipleAnswer: tiposPreguntas.includes("Opción Múltiple"),
                trueFalse: tiposPreguntas.includes("Verdadero/Falso"),
              },
            }).then((res) => {
              const listStr = res.data.list;
              let parsedList;
              try {       
                parsedList = JSON.parse(listStr.trim());
                if (Array.isArray(parsedList)) {
                  sessionStorage.setItem("examData", JSON.stringify(parsedList));
                } else {
                  console.error("Parsed exam data is not an array:", parsedList);
                }
              } catch (e) {
                console.error("Error parsing exam data:", e, listStr);
              }
            })
            .catch((err) => console.error("Exam Error:", err))
        );
        } else {
          requests.push(
            axios.get(`${backendBaseURL}/createExamen`, { params: { path: filePath, num: preguntas, id: userId } }).then((res) => {
              sessionStorage.setItem("examData", JSON.stringify(res.data.list));
            }).catch((err) => console.error("Exam Error:", err))
          );
        }
      }

      await Promise.all(requests);
      console.log("Data generation complete");
      setTimeout(() => {
        setUploading(false);
        router.push("/Actividades");
        onClose();
      }, 500);

    } catch (error) {
      console.error("Error:", error);
      setUploading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal fade show d-block" tabIndex={-1} data-bs-backdrop="static">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Subir Archivos</h1>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div
                className={`dropzone ${dragging ? "dragging" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <p>{dragging ? "Suelta los archivos aquí" : "Arrastra y suelta tus archivos o haz clic para seleccionarlos"}</p>
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              {uploadedFiles.length > 0 && (
                <>
                  <ul id="archivosubido" className="mt-3">
                    {uploadedFiles.map((file, index) => (
                      <li id="nombrearchivo" key={index}>{file.name}</li>
                    ))}
                  </ul>
                  <h5 className="mx-2">Generar:</h5>
                  <div id="btngroup-subir" className="fade-in m-3  ">
                    <button className={`btn btn-tipo m-2 ${selectedOptions.flashcards ? "btn-selected" : ""} `}
                      onClick={() => {
                        toggleOption("flashcards")
                        {isPremium?setShowModalF(true):setShowModalF(false)}
                      }}>Flashcards
                    </button>
                    <button className={`btn btn-tipo m-2 ${selectedOptions.resumen ? "btn-selected" : ""} `}
                      onClick={() => {
                        toggleOption("resumen")
                        {isPremium?setShowModalR(true):setShowModalR(false)}
                      }}>Resumen
                    </button>
                    <button className={`btn btn-tipo m-2 ${selectedOptions.examenPractica ? "btn-selected" : ""}`}
                      onClick={() => {
                        toggleOption("examenPractica");
                        {isPremium?setShowModalE(true):setShowModalE(false)}
                      }}>Prueba
                    </button>
                  </div>
                  
                  
                  {showConfigurations && (
                    <>
                      <hr className="mt-4 mb-3"/>

                      {/* Display selected configurations */}
                      <div className="mx-3 text-muted" style={{ fontSize: "0.85rem" }}>
                        {selectedOptions.flashcards && (
                          <p><strong>Flashcards:</strong> {tarjetas} tarjetas, Formato: {formato}, Dificultad: {dificultad}</p>
                        )}
                        
                        {selectedOptions.resumen && (
                          <p><strong>Resumen:</strong> {palabras} palabras, Redacción: {redaccion}, Enfoque: {enfoque}</p>
                        )}
                        
                        {selectedOptions.examenPractica && (
                          <p><strong>Prueba:</strong> {numeroPreguntas} preguntas, Dificultad: {Ndificultad}, 
                            Tipos: {seleccionadas.length > 0 ? seleccionadas.join(", ") : "Ninguno seleccionado"}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
              {uploading && (
                <div className="progress mt-3">
                  <div className="progress-bar" role="progressbar" style={{ width: `${uploadProgress}%` }}>
                    {uploadProgress}%
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-subir"
                onClick={handleUploadAndGenerate}
                disabled={uploadedFiles.length === 0 || uploading}
              >
                {uploading ? "Generando..." : "Subir Archivos"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detalle de las Flashcards */}
      {showModalF && (
        <ModalDetails
          title="Configura tus Flashcards"
          content={
            <div className="mb-2 ">
              <div className="input-group mb-4 mt-2">
                <span className="input-group-text" id="label-tarjetas">Cantidad de tarjetas</span>
                <input
                  type="number"
                  className="form-control"
                  id="tarjetas"
                  placeholder="10"
                  value={tarjetas}
                  onChange={(e) => setTarjetas(Number(e.target.value))}
                />
              </div>

              <div className="input-group mb-4">
                <span className="input-group-text" id="label-formato">Formato</span>
                <select
                  className="form-select"
                  id="formato"
                  value={formato}
                  onChange={(e) => setFormato(e.target.value)}>
                  <option value="pregunta-respuesta">Pregunta-respuesta</option>
                  <option value="término-definición">Termino definición</option>
                </select>
              </div>

              <div className="input-group">
                <span className="input-group-text" id="label-dificultad">Dificultad</span>
                <select
                  className="form-select"
                  id="dificultad"
                  value={dificultad}
                  onChange={(e) => setDificultad(e.target.value)}>
                  <option value="Básico">Básico</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>
            </div>
          }
          footer={
            <button
              type="button"
              className="btn btn-secondary btn-outline2"
              onClick={() => { 
                setShowModalF(false); 
                handleModalClose();
              }}
              
            >
              Aceptar
            </button>
          }
          onClose={() => setShowModalF(false)} />
      )}

      {/* Detalle de los resumenes */}
      {showModalR && (
        <ModalDetails
          title="Configura tu resumen"
          content={
            <div className="mb-2 ">
              <div className="input-group mb-4 mt-2">
                <span className="input-group-text" id="label-extension">Número de palabras</span>
                <input
                  type="number"
                  className="form-control"
                  id="extension"
                  placeholder="10"
                  value={palabras}
                  onChange={(e) => setPalabras(Number(e.target.value))}
                />
              </div>

              <div className="input-group mb-4">
                <span className="input-group-text" id="label-redaccion">Estilo de redacción</span>
                <select
                  className="form-select"
                  id="redaccion"
                  value={redaccion}
                  onChange={(e) => setRedaccion(e.target.value)}>
                  <option value="formal">Formal</option>
                  <option value="academico">Académico</option>
                  <option value="esquematico">Esquemático (bullet points)</option>
                </select>
              </div>

              <div className="input-group">
                <span className="input-group-text" id="label-enfoque">Enfoque</span>
                <select
                  className="form-select"
                  id="enfoque"
                  value={enfoque}
                  onChange={(e) => setEnfoque(e.target.value)}>
                  <option value="Conceptual">Conceptual</option>
                  <option value="Práctico">Práctico</option>
                  <option value="Con ejemplos">Con ejemplos</option>
                  <option value="Con definiciones clave">Con definiciones clave</option>
                </select>
              </div>
            </div>
          }
          footer={
            <button
              type="button"
              className="btn btn-secondary btn-outline2"
              onClick={() => {setShowModalR(false);
                handleModalClose();}
              }
            >
              Aceptar
            </button>
          }
          onClose={() => setShowModalR(false)} />
      )}

      {/* Detalle de los examenes */}
      {showModalE && (
        <ModalDetails
          title="Configura tu examen"
          content={
            <div className="mb-2 ">
              <div className="input-group mb-4 mt-2">
                <span className="input-group-text" id="label-preguntas">Cantidad de preguntas</span>
                <input
                  type="number"
                  className="form-control"
                  id="preguntas"
                  placeholder="10"
                  value={numeroPreguntas}
                  onChange={(e) => setNumeroPreguntas(Number(e.target.value))}
                />
              </div>

              <div className="input-group mb-4">
                <span className="mb-3" id="label-preguntas">Tipo de preguntas</span>
                <div className="d-flex flex-column w-100">
                  {tiposPreguntas.map((tipo, index) => (
                    <div key={index} className="input-group mb-2">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          value={tipo}
                          id={`checkbox-${index}`}
                          checked={seleccionadas.includes(tipo)}
                          onChange={() => handleCheckboxChange(tipo)}
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id={`label-${index}`}
                        placeholder={tipo}
                        disabled={!seleccionadas.includes(tipo)} // Deshabilita si no está seleccionado
                      />
                    </div>
                  ))}
                </div>
              </div>


              <div className="input-group">
                <span className="input-group-text" id="label-Ndificultad">Nivel de dificultad</span>
                <select
                  className="form-select"
                  id="Ndificultad"
                  value={Ndificultad}
                  onChange={(e) => setNdificultad(e.target.value)}>
                  <option value="Básico">Básico</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>
            </div>
          }
          footer={
            <button
              type="button"
              className="btn btn-secondary btn-outline2"
              onClick={() => {setShowModalE(false); handleModalClose();}}
            >
              Aceptar
            </button>
          }
          onClose={() => setShowModalE(false)} />
      )}
    </div >
  );
}

