const bcrypt = require('bcrypt');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const { validatePassword } = require('../utils/validators');

//cuantas veces se aplica  el agoritmo. 
const SALT_ROUND = 10;

//registra un usuario nuevo y devuelve sus datos publicos
async function registerUser({ name, email, password }) {
    //1. validamos la contraseña antes de cifrarla
    const  passwordError = validatePassword(password);
    if(passwordError) {
        throw new AppError(passwordError, 400);
    }

    //2.Generamos el Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

    //3.Guardamos el usuario. El rol No se recibe: siempre será "user"
    const user = await User.create({ name, email, password: hashedPassword });

    //4. Devolvemos solo los datos públicos (nunca la contraseña)
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    
}

module.exports = {registerUser};

