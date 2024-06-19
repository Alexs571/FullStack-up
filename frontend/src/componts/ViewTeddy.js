import React, { useState, useEffect } from "react";

const ViewTeddy = ({ userId, teddyId }) => {
    const [teddy, setTeddy] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerTeddy = async () => {
            try {
                const respuesta = await fetch(`http://localhost:8080/api/teddies/${userId}/${teddyId}`);
                const datos = await respuesta.json();
                if (datos.success) {
                    setTeddy(datos.data);
                } else {
                    console.error("Error al obtener el teddy:", datos.message);
                }
                setCargando(false);
            } catch (error) {
                console.error("Error al obtener el teddy:", error);
                setCargando(false);
            }
        };

        obtenerTeddy();
    }, [userId, teddyId]);

    if (cargando) {
        return <div>Cargando...</div>;
    }

    if (!teddy) {
        return <div>No se encontró el teddy.</div>;
    }

    return (
        <div className="view-teddy">
            <h2>Detalles del Teddy</h2>
            <div className="teddy-details">
                <p>Tipo: {teddy.type}</p>
                <p>Accesorio: {teddy.accessories}</p>
                <p>Color: <span className="color-circle" style={{ backgroundColor: teddy.color }}></span> {teddy.color}</p>
                <img className="teddy-image" src={`/img/${teddy.type.toLowerCase()}.webp`} alt={`${teddy.type} ${teddy.color} ${teddy.accessories}`} />
            </div>
        </div>
    );
};

export default ViewTeddy;
