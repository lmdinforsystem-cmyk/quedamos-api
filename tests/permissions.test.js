import { describe, it, expect } from 'vitest';
import mongoose from 'mongoose';
import { isOwnerOrAdmin } from '../src/utils/permissions.js';
import { ana, admin } from './helpers.js';

// Una actividad cuyo creador es Ana (en la base de datos, el creador es un ObjectId)
const anaId = new mongoose.Types.ObjectId(ana.id);
const luis = { id: '6749c1bbbbbbbbbbbbbbbbbb', role: 'user' };

describe('isOwnerOrAdmin', () => {
  it('el creador puede', () => {
    expect(isOwnerOrAdmin(ana, anaId)).toBe(true);
  });

  it('otro usuario no puede', () => {
    expect(isOwnerOrAdmin(luis, anaId)).toBe(false);
  });

  it('un admin puede aunque no sea el creador', () => {
    expect(isOwnerOrAdmin(admin, anaId)).toBe(true);
  });

  it('funciona también si el id del creador llega como texto', () => {
    expect(isOwnerOrAdmin(ana, ana.id)).toBe(true);
    expect(isOwnerOrAdmin(luis, ana.id)).toBe(false);
  });
});