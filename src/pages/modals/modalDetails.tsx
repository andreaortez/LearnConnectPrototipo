import React from 'react';

interface ModalParams {
    title: string;
    content: React.ReactNode;
    footer: React.ReactNode;
    onClose: () => void;
}

export default function ModalDetails({ title, content, footer, onClose }: ModalParams) {
    return (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{`${title}`}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {content}
                    </div>
                    <div className="modal-footer">
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    );
};