//Comprueba que la contraseña cumple los requisitos mínimos
export function validatePassword(password) {
    if (typeof password !== 'string' || password.length === 0) {
        return 'La contraseña es obligatoria';
    }
    if (password.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
        return 'La contraseña debe contener al menos una letra y un número';
    }
    return null;
}
