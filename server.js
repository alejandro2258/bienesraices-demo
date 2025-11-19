const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const db = require('./database/db');
const authRoutes = require('./routes/auth');
const propiedadesRoutes = require('./routes/propiedades');
const blogRoutes = require('./routes/blog');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: true, // Permitir cualquier origen
    credentials: true // Permitir credenciales (cookies, sesiones)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de sesiones
app.use(session({
    secret: 'tu-secreto-super-seguro-cambiar-en-produccion',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Cambiar a true en producción con HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

// Inicializar base de datos
db.init();

// Rutas API (ANTES de los archivos estáticos)
app.use('/api/auth', authRoutes);
app.use('/api/propiedades', propiedadesRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/admin', adminRoutes);

// Archivos estáticos (DESPUÉS de las rutas API)
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname)));

// Servir archivos HTML estáticos
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/anuncios.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'anuncios.html'));
});

app.get('/anuncio.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'anuncio.html'));
});

app.get('/blog.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/entrada.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'entrada.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-login.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

