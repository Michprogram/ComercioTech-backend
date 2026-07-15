import mongoose from 'mongoose';

const pedidosSchema = new mongoose.Schema({
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  productos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    default: 1
  },
  estado: {
    type: String,
    required: true,
    default: 'Pendiente'
  },
  fecha_pedido: {
    type: Date,
    required: true,
    default: Date.now  //Fecha por defecto al momento de crear el pedidom, si no, puede dar error al crear el pedido
  }
});

const Pedido = mongoose.model('Pedido', pedidosSchema);

export default Pedido;
