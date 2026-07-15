import Pedido from '../models/Pedidos.js';

export const getAllPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('cliente_id', 'rut nombre username region comuna')
      .populate('productos', 'nombre precio categoria');

    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
  }
};


export const createPedido = async (req, res) => {
  try {
    const { cliente_id, productos, fecha_pedido } = req.body;
    const nuevoPedido = new Pedido({ cliente_id, productos, fecha_pedido });
    const pedidoGuardado = await nuevoPedido.save();
    res.status(201).json(pedidoGuardado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear pedido', error: error.message });
  }
};

export const updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente_id, productos, fecha_pedido } = req.body;
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      id,
      { cliente_id, productos, fecha_pedido },
      { new: true, runValidators: true }
    );

    if (!pedidoActualizado) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(200).json(pedidoActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar pedido', error: error.message });
  }
};

export const deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoEliminado = await Pedido.findByIdAndDelete(id);

    if (!pedidoEliminado) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(200).json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar pedido', error: error.message });
  }
};
