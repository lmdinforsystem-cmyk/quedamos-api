const mongoose = require('mongoose');

//Esquema: define la forma  y las reglas de cada usuario
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true,
            minlength: [2, 'El nombre debe tener al menos dos caracteres'],
            maxlength:  [50, 'El nombre no debe superar  los 50 caracteres']
        },
        email: {
            type: String,
            required: [true, 'El email es obligatorio'],
            unique: true, //no puede haber dos usuarios con el mismo email
            lowercase: true, //se guarda siempre en minusculas
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'El email no tiene un formato válido']
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            select: false //nunca devuelve las consultas salvo que se pida
        },
        role: {
            type: String,
            enum: {
                values: ['user', 'admin'],
                message: 'El rol debe ser user o admin',
            },
            default: 'user', // todo usuario nuevo es user
        },
     
    },
    {
        timestamps: true, //añade createAt y updateAt automaticamente
    }
);

//CREAR EL MODELO A PARTIR DEL ESQUEMA Y LO EXPORTAMOS
module.exports = mongoose.model('User', userSchema);