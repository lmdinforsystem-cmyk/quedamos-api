import mongoose from 'mongoose';

// Conecta con MongoDB. Recibe la dirección como parámetro
async function connectDB(uri) {
  await mongoose.connect(uri);
  console.log(`MongoDB conectado: ${mongoose.connection.name}`);
}

export default connectDB;