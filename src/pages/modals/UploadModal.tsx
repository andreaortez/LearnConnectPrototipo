import React, { useState } from "react";
import axios from "axios";

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
  const [dragging, setDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<OptionKeys, boolean>>({
    flashcards: false,
    resumen: false,
    examenPractica: false,
  });

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
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const simulateUpload = () => {
    setUploading(true);
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        setUploadProgress(0);
        onFileUpload(uploadedFiles);
        onClose();
      }
    }, 300); 
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
                    onClick={() => toggleOption("flashcards")}>Flashcards</button>
                    <button className={`btn btn-tipo m-2 ${selectedOptions.resumen ? "btn-selected" : ""} `} 
                    onClick={() => toggleOption("resumen")}>Resumen</button>
                    <button className={`btn btn-tipo m-2 ${selectedOptions.examenPractica ? "btn-selected" : ""}`}
                    onClick={() => toggleOption("examenPractica")}>Prueba</button>
                  </div>
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
                onClick={simulateUpload}
                disabled={uploadedFiles.length === 0 || uploading}
              >
                {uploading ? "Generando..." : "Subir Archivos"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
