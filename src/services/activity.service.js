import Activity from '../models/Activity.js';
import AppError from '../utils/AppError.js';
import { isFutureDate } from '../utils/validators.js';
import { isOwnerOrAdmin } from '../utils/permissions.js';

// Los campos que se pueden modificar. Nunca creator ni participants
const EDITABLE_FIELDS = ['title', 'description', 'city', 'category', 'date', 'maxParticipants'];

// Crea una actividad. El creador sale del token, nunca del body
export async function createActivity(data, userId) {
    // Si llega fecha, debe ser futura (si no llega, el esquema dará "obligatoria")
    if (data.date !== undefined && !isFutureDate(data.date)) {
        throw new AppError('La fecha debe ser una fecha válida y futura', 400);
    }

    return Activity.create({
        ...data,
        creator: userId,
        participants: [], // una actividad nace sin participantes
    });
}

// Lista todas las actividades, las más próximas primero
export async function getActivities() {
    return Activity.find().populate('creator', 'name').sort({ date: 1 });
}

// Devuelve una actividad con el nombre de su creador y de sus participantes
export async function getActivityById(id) {
    const activity = await Activity.findById(id)
        .populate('creator', 'name')
        .populate('participants.user', 'name');

    if (!activity) {
        throw new AppError('Esa actividad no existe', 404);
    }

    return activity;
}

// Busca una actividad y comprueba que el usuario puede gestionarla.
// La usan tanto modificar como borrar, para no repetir código
async function findOwnActivity(id, user) {
    // Sin populate: necesitamos el creator como ObjectId para comparar
    const activity = await Activity.findById(id);

    if (!activity) {
        throw new AppError('Esa actividad no existe', 404);
    }
    if (!isOwnerOrAdmin(user, activity.creator)) {
        throw new AppError('Solo el creador o un admin pueden gestionar esta actividad', 403);
    }

    return activity;
}

// Modifica una actividad: solo los campos permitidos que lleguen en "changes"
export async function updateActivity(id, changes, user) {
    const activity = await findOwnActivity(id, user);

    // Si cambia la fecha, debe ser futura
    if (changes.date !== undefined && !isFutureDate(changes.date)) {
        throw new AppError('La fecha debe ser una fecha válida y futura', 400);
    }

    // No se puede dejar menos plazas que participantes apuntados
    const joined = activity.participants.length;
    if (changes.maxParticipants !== undefined && changes.maxParticipants < joined) {
        throw new AppError(
            `No puedes dejar menos plazas que participantes apuntados (${joined})`,
            400
        );
    }

    // Solo cambiamos los campos permitidos que hayan llegado
    for (const field of EDITABLE_FIELDS) {
        if (changes[field] !== undefined) {
            activity.set(field, changes[field]);
        }
    }

    // save() vuelve a ejecutar las validaciones del esquema
    return activity.save();
}

// Borra una actividad (y con ella, sus participantes embebidos)
export async function deleteActivity(id, user) {
    const activity = await findOwnActivity(id, user);
    await activity.deleteOne();
}