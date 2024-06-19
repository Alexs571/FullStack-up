import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Producto = ({ posicion, tipo, accesorio, color, imagen, teddyId, eliminarTeddy }) => (
    <div className="producto">
        <img className="opcion teddy-image" src={imagen} alt={`${tipo} ${color} ${accesorio}`} />
        <div className="atributos">
            <span className="opcion teddy-type">{tipo}</span>
            <span className="opcion teddy-accessory">{accesorio}</span>
            <span className="opcion teddy-color">
                color: <span className="color-circle" style={{ backgroundColor: color }}></span> {color}
            </span>
            <div className="botones-producto">
                <button className="btn-producto" onClick={() => eliminarTeddy(teddyId)}>Eliminar</button>
                <Link className="btn-producto" to={`/update/${teddyId}`}>Ver</Link>
            </div>
        </div>
    </div>
);

const GetTeddies = ({ userId, token }) => {
    const [elementosTeddies, setElementosTeddies] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [elementosPorPagina] = useState(6);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:8080/api/teddies/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const datos = respuesta.data;
                if (datos.success) {
                    setElementosTeddies(datos.data);
                } else {
                    console.error("Error al obtener datos de teddies:", datos.message);
                }
                setCargando(false);
            } catch (error) {
                console.error("Error al obtener datos de teddies:", error);
                setCargando(false);
            }
        };

        obtenerDatos();
    }, [userId, token]);

    const eliminarTeddy = async (teddyId) => {
        try {
            const respuesta = await axios.delete(`http://localhost:8080/api/teddies/${userId}/${teddyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const datos = respuesta.data;
            if (datos.success) {
                setElementosTeddies(elementosTeddies.filter(teddy => teddy._id !== teddyId));
            } else {
                console.error("Error al eliminar teddy:", datos.message);
            }
        } catch (error) {
            console.error("Error al eliminar teddy:", error);
        }
    };

    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    const elementosActuales = elementosTeddies.slice(indicePrimerElemento, indiceUltimoElemento);

    const paginar = (numeroPagina) => setPaginaActual(numeroPagina);

    if (cargando) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="teddy-container">
            <h2>Tus teddies</h2>
            <div className="teddy-list">
                {elementosActuales.map((elemento, index) => (
                    <Producto
                        key={index}
                        posicion={indicePrimerElemento + index + 1}
                        tipo={elemento.type}
                        accesorio={elemento.accessories}
                        color={elemento.color}
                        imagen={`/img/${elemento.type.toLowerCase()}.webp`}
                        teddyId={elemento._id}
                        eliminarTeddy={eliminarTeddy}
                    />
                ))}
            </div>
            <div className="pagination-container">
                <button
                    className="paginacion-boton"
                    onClick={() => paginar(paginaActual - 1)}
                    disabled={paginaActual === 1}
                >
                    Anterior
                </button>
                <span className="pagina-actual">Página {paginaActual}</span>
                <button
                    className="paginacion-boton"
                    onClick={() => paginar(paginaActual + 1)}
                    disabled={indiceUltimoElemento >= elementosTeddies.length}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default GetTeddies;
