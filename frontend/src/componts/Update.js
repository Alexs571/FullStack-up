import React from 'react';
import UpdateTeddy from './UpdateTeddy';

function Update({ isLoggedIn, userId }) {
    return (
        <div className='update-container'>
            <h1 className='update-crear'>Actualizar Teddy</h1>
            <div className='update-container-form'>
                <UpdateTeddy isLoggedIn={isLoggedIn} userId={userId} />
            </div>
        </div>
    );
}

export default Update;
