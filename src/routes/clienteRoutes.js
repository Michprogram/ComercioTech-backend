import { Router } from 'express';
import {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
} from '../controllers/clienteController.js';

const router = Router();

router.get('/', getAllClientes);
router.get('/:rut', getClienteById);
router.post('/', createCliente);
router.put('/:rut', updateCliente);
router.delete('/:rut', deleteCliente);

export default router;
