import  Activity  from '../models/Activity.js';
import AppError from '../utils/AppError.js';
import { isFutureDate } from '../utils/validators.js';

//Crea una actividad
export async function createAtivity(data, userId) {
    // Si llega fecha, debe ser futura
    if (data.date !== undefined && isFutureDate(data.date)) {
        throw new AppError('La fecha debe ser una fecha válida y futura', 400);
    }

    return Activity.create({
        ...data,
        creator:userId,
        participants: [], // una actividad nace sin participantes
    });
}

// Lista todas las actividades, las más próximas primero
export async function getActivities() {
    return Activity.find().populate('creator', 'name').sort({date: 1});
}

// Devuelve una actividad con el nombre de su creador y de sus participantes
export async function getActivityById(id) {
    const activity = await Activity.findById(id)
    .populate('creador', 'name')
    .populate('participants.user', 'name');
    
    if(!activity) {
        throw new AppError('Esa actividad no existe', 400);
    }

    return activity;
}

