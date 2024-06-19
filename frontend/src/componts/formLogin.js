import React, { useState } from 'react';

const LoginForm = ({ onSubmit, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit({ email, password });
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            {error && <p className="form-error">{error}</p>}
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                />
            </div>
            <button type="submit" className="form-button">Ingresar</button>
        </form>
    );
};

export default LoginForm;
