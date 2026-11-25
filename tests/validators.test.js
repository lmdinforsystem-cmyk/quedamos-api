import { describe, it, expect } from 'vitest';
import { validatePassword, isFutureDate } from '../src/utils/validators.js';


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

describe('isFutureDate', () => {
  // Fijamos el "ahora" para que el test dé siempre el mismo resultado
  const now = new Date('2026-11-01T12:00:00Z');

  it('acepta una fecha posterior', () => {
    expect(isFutureDate('2026-12-01T10:00:00Z', now)).toBe(true);
  });

  it('rechaza una fecha anterior', () => {
    expect(isFutureDate('2026-10-01T10:00:00Z', now)).toBe(false);
  });

  it('rechaza un texto que no es una fecha', () => {
    expect(isFutureDate('patata', now)).toBe(false);
  });
});