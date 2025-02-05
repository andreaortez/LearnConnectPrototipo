import React from 'react';

interface ModalParams {
    title: string;
    message: string;
    onClose: () => void;
    footer?: React.ReactNode;
}

export default function Modal({ title, message, onClose, footer }: ModalParams) {
    return (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{`${title}`}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>{`${message}`}</p>
                    </div>
                    {footer && (
                        <div className="modal-footer">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};