import React, { useState, useEffect } from "react";


const Producto = ({ posicion, tipo, accesorio, color, ventas, imagen }) => (
    <div className="producto ">
        <span className="opcion ranking-position">#{posicion}</span>
        <img className="opcion ranking-image" src={imagen} alt={`${tipo} ${color} ${accesorio}`} />
        <div className="atributos" >
            <span className="opcion ranking-type">{tipo}</span>
            <span className="opcion ranking-accessory">{accesorio}</span>
            <span className="opcion ranking-color">
                color :<span className="color-circle" style={{ backgroundColor: color }}></span> 
            </span>
            <span className="opcion ranking-sales">{ventas} Veces elegido</span>
        </div>

    </div>
);

const Ranking = () => {
    const [elementosRanking, setElementosRanking] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const respuesta = await fetch('http://localhost:8080/api/populares');
                const datos = await respuesta.json();
                setElementosRanking(datos);
                setCargando(false);
            } catch (error) {
                console.error('Error al obtener datos del ranking:', error);
                setCargando(false);
            }
        };

        obtenerDatos();
    }, []);

    if (cargando) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="ranking-container">
            <h2>Los más elegidos</h2>
            <div className="ranking-list">
                {elementosRanking.map((elemento, index) => {
                    const { type, color, accessories } = elemento._id;
                    const imagenProducto = `/img/${type.toLowerCase(type)}.webp`;

                    return (
                        <Producto
                            key={index}
                            posicion={index + 1}
                            tipo={type}
                            accesorio={accessories}
                            color={color}
                            ventas={elemento.count}
                            imagen={imagenProducto}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Ranking;
