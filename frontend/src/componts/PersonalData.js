import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PersonalData = ({ userId, setUsername }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/${userId}`);
                setUserData(response.data);
                setUsername(response.data.username); // Actualizar el username en Profile
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId, setUsername]);

    if (!userData) {
        return <p>Cargando datos...</p>;
    }

    return (
        <div className="profile-section">
            <h2>Datos Personales</h2>
            <p><strong>Usuario:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>ID:</strong> {userData.id}</p>
        </div>
    );
};

export default PersonalData;
