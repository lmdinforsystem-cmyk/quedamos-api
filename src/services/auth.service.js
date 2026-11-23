import bcrypt from 'bcrypt';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import { validatePassword } from '../utils/validators.js';

// Cuántas veces se aplica el algoritmo
const SALT_ROUNDS = 10;

// Registra un usuario nuevo y devuelve sus datos públicos
export async function registerUser({ name, email, password }) {
  // 1. Validamos la contraseña antes de cifrarla
  const passwordError = validatePassword(password);
  if (passwordError) {
    throw new AppError(passwordError, 400);
  }

  // 2. Generamos el hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // 3. Guardamos el usuario. El rol no se recibe: siempre será "user"
  const user = await User.create({ name, email, password: hashedPassword });

  // 4. Devolvemos solo los datos públicos (nunca la contraseña)
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}