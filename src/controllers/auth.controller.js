import * as authService from '../services/auth.service.js';
//lee los datos  de la perición, llama al servicio y responde
export async function register(req, res) {
    //si no llega body, usamos un objeto vacío para no romper el servidor
    const { name, email, password } = req.body ?? {};

    //el servicio valida, cifra y guarda el usuario
     const user = await authService.registerUser({ name, email, password });

     //201= recurso creaado
     res.status(201).json({
        message: 'Usuario registrado correctamente',
        user,
     });


}