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

    const activity = await activityService.createAtivity(
        { title, description, city, category, date, maxParticipants },
        req.user.id
    );

    res.status(201).json({ activity });
}
