// ¿Es este usuario el dueño del recurso?
// user: el usuario del token (req.user). ownerId: el id del creador (ObjectId o texto)
export function isOwner(user, ownerId) {
  return user.id === ownerId.toString();
}

// ¿Puede editar o borrar el recurso? Solo su creador o un admin
export function isOwnerOrAdmin(user, ownerId) {
  return user.role === 'admin' || isOwner(user, ownerId);
}
