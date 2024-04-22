
const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const { createAccessToken } = require('../libs/jwt')


const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10)// nos entrega un string aleatorio
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })


        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id })


        res.cookie('token', token)
        res.json({
            message: "user created successfully",
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al registrar usuario: ' + error.message);
    }

}


const login = async (req, res) => {


    try {
        //existe user o no.
        const { email, password } = req.body;
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "User not found" });


        // compare password
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" })



        const token = await createAccessToken({ id: userFound._id })


        res.cookie('token', token)
        res.json({
            message: "user login successfully",
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al logear usuario: ' + error.message);
    }

}


const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({ message: "User not found" });
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
    })
    
   
};
module.exports = {
    register,
    login,
    logout,
    profile
};
