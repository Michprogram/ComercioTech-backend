import mongoose from 'mongoose';

const pedidosSchema = new mongoose.Schema({
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    }
  ],
  fecha_pedido: {
    type: Date,
    required: true
  }
});

const Pedido = mongoose.model('Pedido', pedidosSchema);

export default Pedido;
