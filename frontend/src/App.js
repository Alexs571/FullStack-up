import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Header from './componts/header';
import Inicio from './componts/inicio';
import Crear from './componts/crear';
import Nosotros from './componts/nosotros';
import Profile from './componts/Profile';
import UpdateTeddy from './componts/UpdateTeddy';
import './App.css';

const cookies = new Cookies();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null); // Estado para almacenar el token

    useEffect(() => {
        // Verificar si hay un token almacenado en las cookies al cargar la aplicación
        const tokenFromCookie = cookies.get('token');
        if (tokenFromCookie) {
            setIsLoggedIn(true);
            setToken(tokenFromCookie); // Establecer el token en el estado
         
        }
    }, []);

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setUserId(user.id);
        // Almacenar el token en las cookies
        cookies.set('token', user.token, { path: '/', maxAge: 3600 }); //  token válido por 1 hora
        setToken(user.token); // Establecer el token en el estado
        console.log("Token JWT recibido y almacenado en cookies:", user.token);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserId(null);
        // Eliminar el token de las cookies
        cookies.remove('token', { path: '/' });
        setToken(null); // Limpiar el token del estado
    };

    return (
        <Router>
            <div className="app">
                <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} onLogin={handleLogin} />
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/crear" element={<Crear isLoggedIn={isLoggedIn} userId={userId} />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} userId={userId} token={token} />} />
                    <Route path="/update/:teddyId" element={<UpdateTeddy isLoggedIn={isLoggedIn} userId={userId} token={token}  />} />
                    {/* Otras rutas */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
