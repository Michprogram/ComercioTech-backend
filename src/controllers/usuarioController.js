import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 1. REGISTRO DE ADMINISTRADOR
export const registrar = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el correo ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Triturar (Encriptar) la contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = await bcrypt.hash(password, salt);

        // Guardar en la base de datos
        const nuevoUsuario = new Usuario({
            email,
            password: passwordEncriptada
        });
        await nuevoUsuario.save();

        res.status(201).json({ message: 'Administrador creado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// 2. INICIO DE SESIÓN (LOGIN)
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: 'Credenciales inválidas' });
        }

        // Comparar contraseña ingresada con la encriptada en la base de datos
        const passwordCorrecta = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecta) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Generar el Pase VIP (Token)
        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '2h' } // Expira en 2 horas por seguridad
        );

        res.status(200).json({ token, email: usuario.email });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};