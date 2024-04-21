//importo modelo usuario
const User = require("../models/user.model")


const register = async (req, res) => {
    const { email, password, username } = req.body
   
    try {
       
        const newUser = new User({
            username,
            email,
            password
        })
        console.log('Nuevo usuario:', newUser);
    
       await newUser.save();
        console.log("usuario registrado")
        res.send('Registrando usuario');
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al registrar usuario: ' + error.message);
    }
  
}
const login = async(email,password) => {

    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');

    const  result = await User.findOne({ email: email, isActive:true, password:cryptoPass })
    
    if (result){
            // retorno token
            //jwt.sign('payload','secret_key','options')
            //const token = jwt.sign({ foo: 'bar' }, 'secret_key');    
            const token = "fgdgbrfeer6g1df23g86ef2gs";
            return token;
    }
    return null; // retorno 

}
module.exports = {
    register,
    login
};

//