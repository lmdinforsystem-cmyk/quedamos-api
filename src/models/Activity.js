import mongoose from 'mongoose';

// Categorías permitidas. Las exportamos para reutilizarlas (por ejemplo, en los filtros)
export const CATEGORIES = [
  'deporte',
  'cultura',
  'ocio',
  'gastronomia',
  'juegos',
  'citas',
  'otros',
];

// Subesquema de un participante. No es una colección:
// vive dentro de cada actividad (embebido)
const participantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // referencia al usuario que se apunta
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now, // fecha de inscripción automática
    },
  },
  { _id: false } // no necesita su propio _id: el usuario ya lo identifica
);

// Esquema principal de la actividad
const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
      minlength: [3, 'El título debe tener al menos 3 caracteres'],
      maxlength: [100, 'El título no puede superar los 100 caracteres'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'La descripción no puede superar los 1000 caracteres'],
    },
    city: {
      type: String,
      required: [true, 'La ciudad es obligatoria'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      lowercase: true,
      enum: {
        values: CATEGORIES,
        message: 'La categoría no es válida',
      },
    },
    date: {
      type: Date,
      required: [true, 'La fecha es obligatoria'],
    },
    maxParticipants: {
      type: Number,
      required: [true, 'El número máximo de participantes es obligatorio'],
      min: [2, 'Debe permitir al menos 2 participantes'],
      max: [50, 'No puede superar los 50 participantes'],
      validate: {
        validator: Number.isInteger,
        message: 'El número de participantes debe ser un número entero',
      },
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // REFERENCIA: solo guardamos el _id del usuario
      required: true,
    },
    participants: {
      type: [participantSchema], // EMBEBIDO: array de subdocumentos
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // incluye los campos virtuales al responder
  }
);

// Campo virtual: no se guarda en la base de datos, se calcula al momento
activitySchema.virtual('availableSpots').get(function () {
  return this.maxParticipants - this.participants.length;
});

// Índices para que las búsquedas frecuentes sean rápidas
activitySchema.index({ city: 1, category: 1, date: 1 });
activitySchema.index({ 'participants.user': 1 });

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;