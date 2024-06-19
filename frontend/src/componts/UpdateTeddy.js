import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import CustomAlert from './CustomAlert';
import { useParams } from 'react-router-dom';

function UpdateTeddy({ isLoggedIn, userId }) {
    const { teddyId } = useParams();
    const [formData, setFormData] = useState({
        type: '',
        color: '',
        accessories: ''
    });
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        const obtenerTeddy = async () => {
            try {
                const token = cookies.token;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                const response = await axios.get(`http://localhost:8080/api/teddies/${userId}/${teddyId}`, config);

                if (response.status === 200) {
                    const teddyData = response.data.data;
                    setFormData({
                        type: teddyData.type,
                        color: teddyData.color,
                        accessories: teddyData.accessories
                    });
                } else {
                    setError('No se pudo obtener la información del Teddy');
                }
            } catch (error) {
                setError('Error al obtener los datos del Teddy');
            }
        };

        obtenerTeddy();
    }, [userId, teddyId, cookies.token]);

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
            setError('Por favor, inicia sesión para actualizar un Teddy.');
            return;
        }

        try {
            const token = cookies.token;

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.put(`http://localhost:8080/api/teddies/${userId}/${teddyId}`, formData, config);

            if (response.status === 200) {
                setShowAlert(true);
            } else {
                setError('Hubo un problema al actualizar el Teddy');
            }
        } catch (error) {
            setError('Hubo un error al actualizar el Teddy. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div>
            {showAlert && <CustomAlert message="Felicidades, has actualizado tu Teddy." onClose={closeAlert} />}
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

                <button type="submit">Actualizar Teddy</button>
            </form>
        </div>
    );
}

export default UpdateTeddy;
