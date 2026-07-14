import Cliente from '../models/Cliente.js';

export const getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener clientes', error: error.message });
  }
};

export const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cliente', error: error.message });
  }
};

export const createCliente = async (req, res) => {
  try {
    const { rut, nombre, username, region, comuna } = req.body;
    const nuevoCliente = new Cliente({ rut, nombre, username, region, comuna });
    const clienteGuardado = await nuevoCliente.save();
    res.status(201).json(clienteGuardado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cliente', error: error.message });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { rut, nombre, username, region, comuna } = req.body;
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      id,
      { rut, nombre, username, region, comuna },
      { new: true, runValidators: true }
    );

    if (!clienteActualizado) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.status(200).json(clienteActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cliente', error: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteEliminado = await Cliente.findByIdAndDelete(id);

    if (!clienteEliminado) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.status(200).json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cliente', error: error.message });
  }
};
