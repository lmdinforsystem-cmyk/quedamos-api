import * as activityService from '../services/activity.service.js';

// GET /api/activities
export async function list(req, res) {
    const activities = await activityService.getActivities();
    res.status(200).json({ activities });
}

// GET /api/activities/:id
export async function getById(req, res) {
    const activity = await activityService.getActivityById(req.params.id);
    res.status(200).json({ activity });
}

// POST /api/activities
export async function create(req, res) {
    const {title, description, city, category, date, maxParticipants } = req.body ?? {}

    const activity = await activityService.createActivity(
        { title, description, city, category, date, maxParticipants },
        req.user.id
    );

    res.status(201).json({ activity });
}

// PATCH /api/activities/:id
// Modifica una actividad (solo el creador o un admin)
export async function update(req, res) {
    const activity = await activityService.updateActivity(req.params.id, req.body ?? {}, req.user);
    res.status(200).json({ activity });
}


// DELETE /api/activities/:id
// Borra una actividad (solo el creador o un admin)
export async function remove(req, res) {
    await activityService.deleteActivity(req.params.id, req.user);
    res.status(200).json({ message: 'Actividad eliminada' });
}
