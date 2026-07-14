import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productoRoutes from './src/routes/productoRoutes.js';

dotenv.config();

//const express = require('express');
//const mongoose = require('mongoose');
//const cors = require('cors');

const app = express();

// Configuración de Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/productos', productoRoutes);

// Conexión limpia a MongoDB Atlas usando tu URI segura
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
    family: 4 // Esto obliga a Node.js a usar IPv4 y soluciona el bloqueo de DNS en Windows
})
    .then(() => console.log('🟢 Conexión exitosa a la nube de MongoDB Atlas'))
    .catch(err => console.error('🔴 Error crítico de conexión a la base de datos:', err));

// Ruta inicial de prueba
app.get('/api/status', (req, res) => {
    res.json({ status: 'online', message: 'Servidor de ComercioTech funcionando correctamente' });
});

// Encender el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en ${uri}:${PORT}`);
});

app.get("/", (req, res) => { res.send("API Sistema Académico funcionando"); });


app.get("/cliente", (req, res) => { res.send("Atendiendo cliente..."); });
