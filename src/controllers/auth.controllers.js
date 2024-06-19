
const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const { createAccessToken } = require('../libs/jwt')

const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        // Verificar si el usuario o el correo electrónico ya están registrados
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Ya existe una cuenta con este E-email." });
            }
            if (existingUser.username === username) {
                return res.status(400).json({ message: "Username ya está en uso" });
            }
        }

        // Si no existe, proceder con el registro
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        // Establecer la cookie y enviar la respuesta
        res.cookie('token', token);
        res.status(201).json({
            message: "Usuario registrado exitosamente",
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    }
}



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(400).json({ message: "E-mail no encontrado." });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Generar token de acceso
        const token = await createAccessToken({ id: userFound._id });

        // Establecer la cookie y enviar la respuesta
        res.cookie('token', token);
        res.status(200).json({
            message: "Usuario ha iniciado sesión exitosamente",
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            token:token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
}


const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.params.userId); // Utiliza req.params.userId
        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user data" });
    }
};
module.exports = {
    register,
    login,
    logout,
    profile
};
