import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Cookies from 'universal-cookie'; // Importa directamente desde 'universal-cookie'
import LoginForm from './formLogin';
import RegisterForm from './formRegister';
import '../assets/css/style.css';

const cookies = new Cookies(); // Crea una instancia de Cookies

const LoginModal = ({ isOpen, onRequestClose, handleLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    const handleLoginSubmit = async (formData) => {
        try {
            setError('');
            const response = await axios.post('http://localhost:8080/api/login', formData);
            if (response.status === 200) {
                console.log("Datos recibidos del backend:", response.data); // Verificar los datos recibidos
                const { token } = response.data;
                cookies.set('token', token, { path: '/' }); // Guarda el token en las cookies
                handleLogin(response.data); // Pasa los datos recibidos a handleLogin
                onRequestClose();
            } else {
                setError('Error al iniciar sesión');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400 && data.message === "E-mail no encontrado.") {
                    setError('E-mail incorrecto.');
                } else if (status === 400 && data.message === "Contraseña incorrecta") {
                    setError('Contraseña incorrecta');
                } else {
                    setError('Error al iniciar sesión');
                }
            } else {
                setError('Error de red, vuelve a intentarlo');
            }
        }
    };

    const handleRegisterSubmit = async (formData) => {
        try {
            setError('');
            const response = await axios.post('http://localhost:8080/api/register', formData);
            if (response.status === 201 || response.status === 200) {
                console.log("Datos recibidos del backend:", response.data); // Verificar los datos recibidos
                const { token } = response.data;
                cookies.set('token', token, { path: '/' }); // Guarda el token en las cookies
                handleLogin(response.data); // Pasa los datos recibidos a handleLogin
                onRequestClose();
            } else {
                setError('Error al registrar usuario');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400 && data.message === "Ya existe una cuenta con este E-mail.") {
                    setError('Ya existe una cuenta con este E-mail.');
                } else if (status === 400 && data.message === "Username ya está en uso") {
                    setError('Username ya está en uso');
                } else {
                    setError('Error al registrar usuario');
                }
            } else {
                setError('Error de red, vuelve a intentarlo');
            }
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Login Modal"
            className="Modal"
            overlayClassName="Overlay"
            appElement={document.getElementById('root')}
        >
            <button className='btn-close' onClick={onRequestClose}>X</button>
            <h2 className='form-title'>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>

            {error && <p className="form-error">{error}</p>}

            {isLogin ? (
                <LoginForm onSubmit={handleLoginSubmit} />
            ) : (
                <RegisterForm onSubmit={handleRegisterSubmit} />
            )}
            <button className='btn-second-modal' onClick={toggleForm}>
                {isLogin ? '¿Deseas crear un usuario?' : '¿Ya tienes un usuario?'}
            </button>
        </Modal>
    );
};

export default LoginModal;
