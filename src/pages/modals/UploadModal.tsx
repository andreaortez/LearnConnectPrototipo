import React, { useState } from 'react';
import Modal from './modal';

interface UploadModalProps {
    onClose: () => void;
    onFileUpload: (files: FileList | null) => void;
}

export default function UploadModal({ onClose, onFileUpload }: UploadModalProps) {
    const [files, setFiles] = useState<FileList | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(e.target.files);
        }
    };

    const handleUpload = () => {
        if (files) {
            onFileUpload(files);
            onClose(); // Cierra el modal
        }
    };

    return (
        <Modal
            title="Subir Archivos"
            message="Selecciona los archivos que deseas cargar."
            onClose={onClose}
            footer={
                <button className="btn btn-primary" onClick={handleUpload} disabled={!files}>
                    Subir Archivos
                </button>
            }
        >
            <div className="mb-3">
                <input type="file" multiple onChange={handleFileChange} />
            </div>
        </Modal>
    );
}
