import React, { useState } from 'react';

const RegisterForm = ({ onSubmit, error }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación básica para el nombre de usuario
        if (!username) {
            setUsernameError('El nombre de usuario es requerido');
            return;
        } else {
            setUsernameError('');
        }

        // Validación básica para el email
        if (!email) {
            setEmailError('El email es requerido');
            return;
        } else {
            setEmailError('');
        }

        // Validación básica para la contraseña
        if (!password) {
            setPasswordError('La contraseña es requerida');
            return;
        } else {
            setPasswordError('');
        }

        // Validación de coincidencia de contraseña
        if (password !== confirmPassword) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            return;
        } else {
            setConfirmPasswordError('');
        }

        onSubmit({ username, email, password });
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            {error && <p className="form-error">{error}</p>}
            <div className={`form-group ${usernameError && 'error'}`}>
                <label>Nombre de Usuario:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="form-input"
                />
                {usernameError && <p className="field-error">{usernameError}</p>}
            </div>
            <div className={`form-group ${emailError && 'error'}`}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                />
                {emailError && <p className="field-error">{emailError}</p>}
            </div>
            <div className={`form-group ${passwordError && 'error'}`}>
                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                />
                {passwordError && <p className="field-error">{passwordError}</p>}
            </div>
            <div className={`form-group ${confirmPasswordError && 'error'}`}>
                <label>Confirmar Contraseña:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="form-input"
                />
                {confirmPasswordError && <p className="field-error">{confirmPasswordError}</p>}
            </div>
            <button type="submit" className="form-button">Registrarse</button>
        </form>
    );
};

export default RegisterForm;
