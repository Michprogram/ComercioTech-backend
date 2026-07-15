import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productoRoutes from './src/routes/productoRoutes.js';
import clienteRoutes from './src/routes/clienteRoutes.js';
import pedidoRoutes from './src/routes/pedidoRoutes.js';
import usuarioRoutes from './src/routes/usuarioRoutes.js';

dotenv.config();

const app = express();

// Configuración de Middlewares
app.use(cors());
app.use(express.json());
// Conexión de Rutas
app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Conexión limpia a MongoDB Atlas usando tu URI segura
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
    family: 4 // Esto obliga a Node.js a usar IPv4 y soluciona el bloqueo de DNS en Windows
})
    .then(() => console.log('🟢 Conexión exitosa a la nube de MongoDB Atlas'))
    .catch(err => console.error('🔴 Error crítico de conexión a la base de datos:', err));

// Rutas de estado y bienvenida
app.get('/', (req, res) => {
    res.send('API ComercioTech funcionando correctamente 🚀');
});

app.get('/api/status', (req, res) => {
    res.json({ status: 'online', message: 'Servidor de ComercioTech funcionando correctamente' });
});

// Encender el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // Corregido: Ahora muestra la URL correcta para el navegador local y no filtra la contraseña
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});

// Ruta inicial de prueba
//app.get('/api/status', (req, res) => {
//    res.json({ status: 'online', message: 'Servidor de ComercioTech funcionando correctamente' });
//});

// Encender el servidor
// Inicio del servidor y escucha de solicitudes entrantes.
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
//    console.log(`🚀 Servidor backend corriendo en ${uri}:${PORT}`); ESTO ME FILTRA LAS CREDENCIALES PORQUE IMPRIME URI
//});

//app.get("/", (req, res) => { res.send("API Sistema Académico funcionando"); });


//app.get("/cliente", (req, res) => { res.send("Atendiendo cliente..."); }); 
