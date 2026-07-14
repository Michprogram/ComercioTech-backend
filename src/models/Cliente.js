import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  rut: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  region: {
    type: String,
    required: true,
    trim: true
  },
  comuna: {
    type: String,
    required: true,
    trim: true
  }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;
