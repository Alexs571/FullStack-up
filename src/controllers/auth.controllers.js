//importo modelo usuario
const User = require("../models/user.model")

const authControllers = {
    register(req, res) {
        // // Lógica para el registro de usuario
        const {email,password,username} = req.body
        
        res.send('Registrando usuario');
        
        const newUser = new User({
            username,
            email,
            password
        }) 
        console.log(newUser)
    },
    login  (req, res) {
        // Lógica para el inicio de sesión
        
        res.send('Inicio de sesión');
    }
};

module.exports = authControllers;
