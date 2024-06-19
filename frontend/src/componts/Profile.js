import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetTeddies from "./GetTeddies";
import PersonalData from "./PersonalData";

function Profile({ userId, isLoggedIn, token }) {
    const [activeComponent, setActiveComponent] = useState('personalData');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/inicio");
        }
    }, [isLoggedIn, navigate]);

    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };
    
    return (
        <main className="profile-main">
            <h1>Bienvenido {username}</h1>
            <div className="nav">
                <div className="opciones izq">
                    <button className="btn-profile" onClick={() => handleButtonClick('personalData')}>Datos personales</button>
                </div>
                <div className="opciones">
                    <button className="btn-profile" onClick={() => handleButtonClick('getTeddies')}>Tus Teddies</button>
                </div>
            </div>
            {activeComponent === 'getTeddies' && <GetTeddies userId={userId} token={token} />}
            {activeComponent === 'personalData' && <PersonalData userId={userId} setUsername={setUsername} />}
        </main>
    );
}

export default Profile;
