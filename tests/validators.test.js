import { describe, it, expect } from 'vitest';
import { validatePassword } from '../src/utils/validators.js';

describe('validatePassword', () => {
  it('devuelve null si la contraseña es válida', () => {
    expect(validatePassword('segura123')).toBeNull();
  });

  it('rechaza contraseñas de menos de 8 caracteres', () => {
    expect(validatePassword('abc12')).toBe('La contraseña debe tener al menos 8 caracteres');
  });

  it('rechaza contraseñas sin números', () => {
    expect(validatePassword('soloLetras')).toBe(
      'La contraseña debe contener al menos una letra y un número'
    );
  });

  it('rechaza valores que no son texto', () => {
    expect(validatePassword(12345678)).toBe('La contraseña es obligatoria');
  });
});