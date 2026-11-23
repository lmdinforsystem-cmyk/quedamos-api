//Comprueba que la contraseña cumple los requisitos mínimos
function validatePassword(password) {
    if (typeof password !== 'string' || password.length === 0) {
        return 'La contraeña es obligatoria';
    }
    if (password.length < 8) {
        return 'La contraeña debe tener al menos 8 caracteres';
    }
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
        return 'La contraseña debe contener al menos una letra y un número';
    }
    return null;
}
export default { validatePassword };