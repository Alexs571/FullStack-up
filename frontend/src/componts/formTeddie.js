import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';

function TeddyForm({ onSave, isLoggedIn, userId }) {
    const [formData, setFormData] = useState({
        user: '',
        type: 'rabbit',
        color: '',
        accessories: '',
        count: 1
    });
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            user: userId
        }));
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            setError('Por favor, inicia sesión para crear un Teddy.');
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/api/teddies", formData);
            if (response.status === 201) {
                onSave(true);
                setShowAlert(true);
            }
        } catch (error) {
            setError('Hubo un error al crear el Teddy. Por favor, inténtalo de nuevo más tarde.');
            onSave(false);
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div>
            {showAlert && <CustomAlert message="Felicidades, has guardado tu teddy. Lo podrás encontrar en tu perfil." onClose={closeAlert} />}
            <form className="teddy-form" onSubmit={handleSubmit}>
                <div className='crear-img-form'>
                    {formData.type && (
                        <img className='img-crear' src={`/img/${formData.type}.webp`} alt="Teddy" />
                    )}
                </div>

                <label htmlFor="type">Tipo:</label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="dog">Dog</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="teddy">Teddy</option>
                    <option value="raccoon">Raccoon</option>
                    <option value="cat">Cat</option>
                </select>

                <label htmlFor="color">Color:</label>
                <select
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un color</option>
                    <option value="pink">Pink</option>
                    <option value="yellow">Yellow</option>
                    <option value="green">Green</option>
                </select>

                <label htmlFor="accessories">Accesorios:</label>
                <select
                    id="accessories"
                    name="accessories"
                    value={formData.accessories}
                    onChange={handleChange}
                    required
                >
                    <option value="">Elija Accesorios</option>
                    <option value="computadora">Computadora</option>
                    <option value="pelota">Pelota</option>
                    <option value="guitarra">Guitarra</option>
                </select>

                {error && <p className="error-message">{error}</p>}

                <button type="submit">Guardar Teddy</button>
            </form>
        </div>
    );
}

export default TeddyForm;
