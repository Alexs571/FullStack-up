import React from "react";
import { Link } from 'react-router-dom';
import Ranking from './rankin';

function Inicio() {
    return (
        <div className="container-ranking">
            <div className="inicio-main">
                <h1>Bienvenido a ted<span className="span-name-color">:d</span>ies</h1>
                <h2>Deseas crear un teddie?</h2>
                <Link to="/crear"><button className="btn-crear" >Crear</button></Link>
            </div>

            <Ranking/>

        </div>
    )

}

export default Inicio;