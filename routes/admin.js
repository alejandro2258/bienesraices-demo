const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { propiedades } = require('../database/db');

const router = express.Router();

// Middleware para verificar autenticación
function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'No autorizado. Debes iniciar sesión.' });
    }
    next();
}

// Configurar multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../build/img');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'anuncio-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp)'));
        }
    }
});

// Obtener todas las propiedades (admin)
router.get('/propiedades', requireAuth, (req, res) => {
    try {
        const todasPropiedades = propiedades.getAll();
        res.json(todasPropiedades);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener propiedades' });
    }
});

// Crear nueva propiedad
router.post('/propiedades', requireAuth, upload.single('imagen'), (req, res) => {
    try {
        const { titulo, precio, descripcion, wc, estacionamiento, habitaciones } = req.body;

        if (!titulo || !precio || !req.file) {
            return res.status(400).json({ error: 'Título, precio e imagen son requeridos' });
        }

        const imagen = `/build/img/${req.file.filename}`;
        
        const propiedad = {
            titulo,
            precio: parseFloat(precio),
            imagen,
            descripcion: descripcion || '',
            wc: parseInt(wc) || 0,
            estacionamiento: parseInt(estacionamiento) || 0,
            habitaciones: parseInt(habitaciones) || 0
        };

        const id = propiedades.create(propiedad);
        res.json({ success: true, id, propiedad: { ...propiedad, id } });
    } catch (error) {
        console.error('Error al crear propiedad:', error);
        res.status(500).json({ error: 'Error al crear la propiedad' });
    }
});

// Actualizar propiedad
router.put('/propiedades/:id', requireAuth, upload.single('imagen'), (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const propiedadExistente = propiedades.getById(id);

        if (!propiedadExistente) {
            return res.status(404).json({ error: 'Propiedad no encontrada' });
        }

        console.log('Datos recibidos:', req.body);
        console.log('Archivo recibido:', req.file);

        const { titulo, precio, descripcion, wc, estacionamiento, habitaciones } = req.body;
        
        // Si se subió una nueva imagen, usarla; si no, mantener la existente
        let imagen = propiedadExistente.imagen;
        if (req.file) {
            // Eliminar imagen anterior si existe
            if (propiedadExistente.imagen) {
                const oldImagePath = path.join(__dirname, '..', propiedadExistente.imagen);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            imagen = `/build/img/${req.file.filename}`;
        }

        // Usar los valores enviados, o mantener los existentes si están vacíos
        const propiedad = {
            titulo: (titulo && titulo.trim() !== '') ? titulo : propiedadExistente.titulo,
            precio: (precio && precio !== '') ? parseFloat(precio) : propiedadExistente.precio,
            imagen: imagen,
            descripcion: (descripcion !== undefined && descripcion !== null) ? descripcion : propiedadExistente.descripcion,
            wc: (wc !== undefined && wc !== '' && !isNaN(wc)) ? parseInt(wc) : propiedadExistente.wc,
            estacionamiento: (estacionamiento !== undefined && estacionamiento !== '' && !isNaN(estacionamiento)) ? parseInt(estacionamiento) : propiedadExistente.estacionamiento,
            habitaciones: (habitaciones !== undefined && habitaciones !== '' && !isNaN(habitaciones)) ? parseInt(habitaciones) : propiedadExistente.habitaciones
        };

        console.log('Propiedad a actualizar:', propiedad);

        const actualizado = propiedades.update(id, propiedad);
        
        if (actualizado) {
            const propiedadActualizada = propiedades.getById(id);
            res.json({ success: true, message: 'Propiedad actualizada correctamente', propiedad: propiedadActualizada });
        } else {
            res.status(500).json({ error: 'Error al actualizar la propiedad' });
        }
    } catch (error) {
        console.error('Error al actualizar propiedad:', error);
        res.status(500).json({ error: 'Error al actualizar la propiedad', details: error.message });
    }
});

// Eliminar propiedad
router.delete('/propiedades/:id', requireAuth, (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const propiedad = propiedades.getById(id);

        if (!propiedad) {
            return res.status(404).json({ error: 'Propiedad no encontrada' });
        }

        // Eliminar imagen del servidor
        if (propiedad.imagen) {
            const imagePath = path.join(__dirname, '..', propiedad.imagen);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        propiedades.delete(id);
        res.json({ success: true, message: 'Propiedad eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar propiedad:', error);
        res.status(500).json({ error: 'Error al eliminar la propiedad' });
    }
});

module.exports = router;

