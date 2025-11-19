const express = require('express');
const { blog } = require('../database/db');

const router = express.Router();

// Obtener todas las entradas del blog
router.get('/', (req, res) => {
    try {
        const todasEntradas = blog.getAll();
        res.json(todasEntradas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener entradas del blog' });
    }
});

// Obtener una entrada por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const entrada = blog.getById(id);
        
        if (!entrada) {
            return res.status(404).json({ error: 'Entrada no encontrada' });
        }
        
        res.json(entrada);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la entrada' });
    }
});

module.exports = router;


