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

// Comprueba las credenciales y devuelve el token
export async function login(req, res) {
   const { email, password } = req.body ?? {};

   // El servicio comprueba las credenciales y genera el token
   const { token, user } = await authService.loginUser({email, password});

   res.status(200).json({
      message: 'Login correcto',
      token,
      user,
   });

}
