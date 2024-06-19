import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './loginModal';

function Header({ isLoggedIn, onLogout, onLogin }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleLogin = (user) => {
        setUsername(user.username);
        onLogin(user);
        
        closeModal(); // Cierra el modal después de iniciar sesión
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        onLogout();
        setIsMenuOpen(false); // Cierra el menú al hacer logout
    };

    return (
        <header className='header'>
            <div><Link className='logo' to="/">teddies</Link></div>
            <nav className={isMenuOpen ? 'nav open' : 'nav'}>
                <ul>
                    <li className='navOption'><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
                    <li className='navOption'><Link to="/crear" onClick={toggleMenu}>Crear</Link></li>
                    <li className='navOption'><Link to="/nosotros" onClick={toggleMenu}>Nosotros</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li className='navOption'><Link to="/profile " onClick={toggleMenu}>Hola, {username}</Link></li>
                            <li className='navOption'><button className='btn-header' onClick={handleLogout}>Cerrar sesión</button></li>
                        </>
                    ) : (
                        <li className='navOption'><button className='btn-header' onClick={openModal}>Ingresar</button></li>
                    )}
                </ul>
            </nav>

            <div className="menu-toggle" onClick={toggleMenu}>
                <div className={isMenuOpen ? 'bar open' : 'bar'}></div>
                <div className={isMenuOpen ? 'bar open' : 'bar'}></div>
                <div className={isMenuOpen ? 'bar open' : 'bar'}></div>
            </div>

            <LoginModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                handleLogin={handleLogin}
                handleRegister={handleLogin} // handleRegister también debería iniciar sesión
            />
        </header>
    );
}

export default Header;
