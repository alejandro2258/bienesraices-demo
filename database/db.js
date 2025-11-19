const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'bienesraices.db');
const db = new Database(dbPath);

// Inicializar base de datos
function init() {
    // Crear tabla de propiedades
    db.exec(`
        CREATE TABLE IF NOT EXISTS propiedades (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            precio REAL NOT NULL,
            imagen TEXT NOT NULL,
            descripcion TEXT,
            wc INTEGER DEFAULT 0,
            estacionamiento INTEGER DEFAULT 0,
            habitaciones INTEGER DEFAULT 0,
            creado DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Crear tabla de usuarios admin
    db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            creado DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Crear tabla de entradas de blog
    db.exec(`
        CREATE TABLE IF NOT EXISTS blog (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            imagen TEXT NOT NULL,
            contenido TEXT NOT NULL,
            autor TEXT DEFAULT 'Admin',
            fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
            creado DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Crear usuario admin por defecto si no existe
    const usuariosExistentes = db.prepare('SELECT * FROM usuarios').all();
    if (usuariosExistentes.length === 0) {
        const hashedPassword = bcrypt.hashSync('admin123', 10);
        db.prepare('INSERT INTO usuarios (email, password) VALUES (?, ?)')
            .run('admin@bienesraices.com', hashedPassword);
        console.log('Usuario admin creado: admin@bienesraices.com / admin123');
    }

    // Agregar entradas de blog de ejemplo si no hay ninguna
    const blogExistentes = db.prepare('SELECT * FROM blog').all();
    if (blogExistentes.length === 0) {
        const entradasEjemplo = [
            {
                titulo: 'Terraza en el techo de tu casa',
                imagen: 'build/img/blog1.jpg',
                contenido: 'Consejos para construir una terraza en el techo de tu casa con los mejores materiales y ahorrando dinero. Proin consequat viverra sapien, malesuada tempor tortor feugiat vitae. In dictum felis et nunc aliquet molestie. Proin tristique commodo felis, sed auctor elit auctor pulvinar. Nunc porta, nibh quis convallis sollicitudin, arcu nisl semper mi, vitae sagittis lorem dolor non risus. Vivamus accumsan maximus est, eu mollis mi. Proin id nisl vel odio semper hendrerit. Nunc porta in justo finibus tempor. Suspendisse lobortis dolor quis elit suscipit molestie. Sed condimentum, erat at tempor finibus, urna nisi fermentum est, a dignissim nisi libero vel est. Donec et imperdiet augue. Curabitur malesuada sodales congue. Suspendisse potenti. Ut sit amet convallis nisi.\n\nAliquam lectus magna, luctus vel gravida nec, iaculis ut augue. Praesent ac enim lorem. Quisque ac dignissim sem, non condimentum orci. Morbi a iaculis neque, ac euismod felis. Fusce augue quam, fermentum sed turpis nec, hendrerit dapibus ante. Cras mattis laoreet nibh, quis tincidunt odio fermentum vel. Nulla facilisi.',
                autor: 'Admin'
            },
            {
                titulo: 'Guía para la decoración de tu hogar',
                imagen: 'build/img/blog2.jpg',
                contenido: 'Maximiza el espacio en tu hogar con esta guía, aprende a combinar muebles y colores para darle vida a tu espacio. Proin consequat viverra sapien, malesuada tempor tortor feugiat vitae. In dictum felis et nunc aliquet molestie. Proin tristique commodo felis, sed auctor elit auctor pulvinar. Nunc porta, nibh quis convallis sollicitudin, arcu nisl semper mi, vitae sagittis lorem dolor non risus. Vivamus accumsan maximus est, eu mollis mi. Proin id nisl vel odio semper hendrerit. Nunc porta in justo finibus tempor. Suspendisse lobortis dolor quis elit suscipit molestie. Sed condimentum, erat at tempor finibus, urna nisi fermentum est, a dignissim nisi libero vel est. Donec et imperdiet augue. Curabitur malesuada sodales congue. Suspendisse potenti. Ut sit amet convallis nisi.\n\nAliquam lectus magna, luctus vel gravida nec, iaculis ut augue. Praesent ac enim lorem. Quisque ac dignissim sem, non condimentum orci. Morbi a iaculis neque, ac euismod felis. Fusce augue quam, fermentum sed turpis nec, hendrerit dapibus ante. Cras mattis laoreet nibh, quis tincidunt odio fermentum vel. Nulla facilisi.',
                autor: 'Admin'
            },
            {
                titulo: 'Cómo elegir el mejor barrio para tu familia',
                imagen: 'build/img/blog3.jpg',
                contenido: 'Factores importantes a considerar al elegir el lugar perfecto para establecer tu hogar. Proin consequat viverra sapien, malesuada tempor tortor feugiat vitae. In dictum felis et nunc aliquet molestie. Proin tristique commodo felis, sed auctor elit auctor pulvinar. Nunc porta, nibh quis convallis sollicitudin, arcu nisl semper mi, vitae sagittis lorem dolor non risus. Vivamus accumsan maximus est, eu mollis mi. Proin id nisl vel odio semper hendrerit. Nunc porta in justo finibus tempor. Suspendisse lobortis dolor quis elit suscipit molestie. Sed condimentum, erat at tempor finibus, urna nisi fermentum est, a dignissim nisi libero vel est. Donec et imperdiet augue. Curabitur malesuada sodales congue. Suspendisse potenti. Ut sit amet convallis nisi.',
                autor: 'Admin'
            },
            {
                titulo: 'Inversión inmobiliaria: Consejos para principiantes',
                imagen: 'build/img/blog4.jpg',
                contenido: 'Todo lo que necesitas saber para comenzar tu camino en la inversión inmobiliaria. Proin consequat viverra sapien, malesuada tempor tortor feugiat vitae. In dictum felis et nunc aliquet molestie. Proin tristique commodo felis, sed auctor elit auctor pulvinar. Nunc porta, nibh quis convallis sollicitudin, arcu nisl semper mi, vitae sagittis lorem dolor non risus. Vivamus accumsan maximus est, eu mollis mi. Proin id nisl vel odio semper hendrerit. Nunc porta in justo finibus tempor. Suspendisse lobortis dolor quis elit suscipit molestie. Sed condimentum, erat at tempor finibus, urna nisi fermentum est, a dignissim nisi libero vel est. Donec et imperdiet augue. Curabitur malesuada sodales congue. Suspendisse potenti. Ut sit amet convallis nisi.',
                autor: 'Admin'
            }
        ];
        
        const insertBlog = db.prepare(`
            INSERT INTO blog (titulo, imagen, contenido, autor)
            VALUES (?, ?, ?, ?)
        `);
        
        entradasEjemplo.forEach(entrada => {
            insertBlog.run(entrada.titulo, entrada.imagen, entrada.contenido, entrada.autor);
        });
        
        console.log(`${entradasEjemplo.length} entradas de blog de ejemplo agregadas`);
    }

    // Agregar propiedades de ejemplo si no hay ninguna
    const propiedadesExistentes = db.prepare('SELECT * FROM propiedades').all();
    if (propiedadesExistentes.length === 0) {
        const propiedadesEjemplo = [
            {
                titulo: 'Casa de Lujo en el Lago',
                precio: 3000000,
                imagen: 'build/img/anuncio1.jpg',
                descripcion: 'Casa en el lago con excelente vista, acabados de lujo a un excelente precio',
                wc: 3,
                estacionamiento: 3,
                habitaciones: 4
            },
            {
                titulo: 'Casa Terminados de Lujo',
                precio: 2500000,
                imagen: 'build/img/anuncio2.jpg',
                descripcion: 'Casa con acabados de lujo en zona exclusiva',
                wc: 2,
                estacionamiento: 2,
                habitaciones: 3
            },
            {
                titulo: 'Casa con Alberca',
                precio: 3500000,
                imagen: 'build/img/anuncio3.jpg',
                descripcion: 'Hermosa casa con alberca y amplios jardines',
                wc: 4,
                estacionamiento: 4,
                habitaciones: 5
            }
        ];
        
        const insertProp = db.prepare(`
            INSERT INTO propiedades (titulo, precio, imagen, descripcion, wc, estacionamiento, habitaciones)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        
        propiedadesEjemplo.forEach(prop => {
            insertProp.run(prop.titulo, prop.precio, prop.imagen, prop.descripcion, prop.wc, prop.estacionamiento, prop.habitaciones);
        });
        
        console.log(`${propiedadesEjemplo.length} propiedades de ejemplo agregadas`);
    }

    console.log('Base de datos inicializada correctamente');
}

// Funciones para propiedades
const propiedades = {
    getAll: () => {
        return db.prepare('SELECT * FROM propiedades ORDER BY creado DESC').all();
    },
    
    getById: (id) => {
        return db.prepare('SELECT * FROM propiedades WHERE id = ?').get(id);
    },
    
    create: (propiedad) => {
        const { titulo, precio, imagen, descripcion, wc, estacionamiento, habitaciones } = propiedad;
        const result = db.prepare(`
            INSERT INTO propiedades (titulo, precio, imagen, descripcion, wc, estacionamiento, habitaciones)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(titulo, precio, imagen, descripcion, wc, estacionamiento, habitaciones);
        return result.lastInsertRowid;
    },
    
    update: (id, propiedad) => {
        const { titulo, precio, imagen, descripcion, wc, estacionamiento, habitaciones } = propiedad;
        const result = db.prepare(`
            UPDATE propiedades 
            SET titulo = ?, precio = ?, imagen = ?, descripcion = ?, wc = ?, estacionamiento = ?, habitaciones = ?
            WHERE id = ?
        `).run(titulo, precio, imagen, descripcion, wc, estacionamiento, habitaciones, id);
        return result.changes > 0;
    },
    
    delete: (id) => {
        return db.prepare('DELETE FROM propiedades WHERE id = ?').run(id);
    }
};

// Funciones para blog
const blog = {
    getAll: () => {
        return db.prepare('SELECT * FROM blog ORDER BY fecha DESC').all();
    },
    
    getById: (id) => {
        return db.prepare('SELECT * FROM blog WHERE id = ?').get(id);
    },
    
    create: (entrada) => {
        const { titulo, imagen, contenido, autor } = entrada;
        const result = db.prepare(`
            INSERT INTO blog (titulo, imagen, contenido, autor)
            VALUES (?, ?, ?, ?)
        `).run(titulo, imagen, contenido, autor || 'Admin');
        return result.lastInsertRowid;
    },
    
    update: (id, entrada) => {
        const { titulo, imagen, contenido, autor } = entrada;
        const result = db.prepare(`
            UPDATE blog 
            SET titulo = ?, imagen = ?, contenido = ?, autor = ?
            WHERE id = ?
        `).run(titulo, imagen, contenido, autor || 'Admin', id);
        return result.changes > 0;
    },
    
    delete: (id) => {
        return db.prepare('DELETE FROM blog WHERE id = ?').run(id);
    }
};

// Funciones para usuarios
const usuarios = {
    getByEmail: (email) => {
        return db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
    },
    
    create: (email, password) => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        try {
            const result = db.prepare('INSERT INTO usuarios (email, password) VALUES (?, ?)')
                .run(email, hashedPassword);
            return result.lastInsertRowid;
        } catch (error) {
            if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                throw new Error('El email ya está registrado');
            }
            throw error;
        }
    },
    
    getAll: () => {
        return db.prepare('SELECT id, email, creado FROM usuarios ORDER BY creado DESC').all();
    }
};

module.exports = {
    db,
    init,
    propiedades,
    blog,
    usuarios
};

