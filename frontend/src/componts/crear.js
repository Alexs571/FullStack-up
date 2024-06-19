import React, { useState} from 'react';
import TeddyForm from './formTeddie';
import LoginModal from './loginModal';


function Crear({ isLoggedIn, userId }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSave = (success) => {
        if (success) {
            console.log('Teddy creado exitosamente');
        } else {
            console.error('Error al crear el teddy');
        }
    };

    // Verificar que `userId` se recibe correctamente
    console.log('Valor actual de userId en Crear:', userId);


    return (
        <main className='crear-container'>
             <h1 className='title-crear'>Crear un nuevo Teddy</h1>
            <div className='crear-container-form'>
                
               
               
                {/* Mostrar el modal de inicio de sesión si el usuario no está autenticado */}
                {!isLoggedIn && <LoginModal isOpen={modalIsOpen} onRequestClose={closeModal} />}
                
                {/* Renderizar el formulario de Teddy */}
              <TeddyForm onSave={handleSave} userId={userId} isLoggedIn={isLoggedIn}  />
                
            </div>
            
        </main>
    );
}
 
export default Crear;
