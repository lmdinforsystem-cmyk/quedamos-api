import bcrypt from 'bcrypt';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import { validatePassword } from '../utils/validators.js';
import { generateToken } from '../utils/token.js';

// Cuántas veces se aplica el algoritmo
const SALT_ROUNDS = 10;

//Devuelve solo los datos públicos del usuario
function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

//Registra un usuario nuevo y devuelve sus datos públicos
export async function registerUser({ name, email, password }) {
  //1.validar la contraseña antes de cifrarla
  const passwordError = validatePassword(password);
  if (passwordError) {
    throw new AppError(passwordError, 400);
  }

  //2.Generar el hash 
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  //3.Guardar el usuario el rol es "user" siempre
  const user = await User.create({ name, email, password: hashedPassword });

  //4. Devolvemos solo los datos públicos
  return toPublicUser(user);
}
// Comprueba las credenciales y devuelve un token y los datos del usuario
export async function loginUser({ email, password }) {
  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
    throw new AppError('El email y la contraseña son obligatorios', 400);
  }

  //  Buscamos el usuario y pedimos la contraseña expresamente
  const user = await User.findOne({ email: email.toLocaleLowerCase().trim() }).select('+password');

  // Comparamos la contraseña recibida con el hash guardado
  const isValid = user && (await bcrypt.compare(password, user.password));
  if (!isValid) {
    throw new AppError('Email o contraseña incorrectos', 401);
  }
  //Generamos el token
  const token = generateToken(user);

  return { token, user: toPublicUser(user) };

}

// Devuelve los datos públicos del usuario con ese id
export async function getUserById(id) {
  const user = await User.findById(id);

  //el token puede ser válido, pero el usuario  haber sido borrado
  if (!user) {
    throw new AppError('El usuario ya no existe', 404);
  }

  return toPublicUser(user);
}