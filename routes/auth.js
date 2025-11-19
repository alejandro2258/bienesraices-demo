const express = require('express');
const bcrypt = require('bcryptjs');
const { usuarios } = require('../database/db');

const router = express.Router();

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const usuario = usuarios.getByEmail(email);

    if (!usuario) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const passwordMatch = bcrypt.compareSync(password, usuario.password);

    if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    req.session.userId = usuario.id;
    req.session.email = usuario.email;

    res.json({ 
        success: true, 
        message: 'Login exitoso',
        user: { id: usuario.id, email: usuario.email }
    });
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al cerrar sesión' });
        }
        res.json({ success: true, message: 'Sesión cerrada' });
    });
});

// Registro de nuevo admin
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    try {
        const userId = usuarios.create(email, password);
        res.json({ 
            success: true, 
            message: 'Usuario registrado correctamente',
            user: { id: userId, email }
        });
    } catch (error) {
        if (error.message === 'El email ya está registrado') {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

// Verificar sesión
router.get('/check', (req, res) => {
    if (req.session.userId) {
        res.json({ 
            authenticated: true, 
            user: { id: req.session.userId, email: req.session.email }
        });
    } else {
        res.json({ authenticated: false });
    }
});

module.exports = router;

