import React, { useEffect } from 'react';

const CustomAlert = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000); // Desvanecer automáticamente después de 5 segundos

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="custom-alert">
            <div className="custom-alert-content">
                <p>{message}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default CustomAlert;
