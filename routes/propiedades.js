const express = require('express');
const { propiedades } = require('../database/db');

const router = express.Router();

// Obtener todas las propiedades
router.get('/', (req, res) => {
    try {
        console.log('Solicitud GET /api/propiedades recibida');
        const todasPropiedades = propiedades.getAll();
        console.log(`Devolviendo ${todasPropiedades.length} propiedades`);
        res.json(todasPropiedades);
    } catch (error) {
        console.error('Error al obtener propiedades:', error);
        res.status(500).json({ error: 'Error al obtener propiedades', details: error.message });
    }
});

// Obtener una propiedad por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const propiedad = propiedades.getById(id);
        
        if (!propiedad) {
            return res.status(404).json({ error: 'Propiedad no encontrada' });
        }
        
        res.json(propiedad);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la propiedad' });
    }
});

module.exports = router;

