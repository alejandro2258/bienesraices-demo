<<<<<<< HEAD
# bienesraices-demo
=======
# Sistema de Bienes Raíces

Sistema completo de gestión de propiedades inmobiliarias con frontend y backend.

## Características

- ✅ Frontend dinámico que muestra propiedades desde la base de datos
- ✅ Backend con Express.js y SQLite
- ✅ Panel de administración con autenticación
- ✅ CRUD completo de propiedades (crear, leer, eliminar)
- ✅ Subida de imágenes para propiedades
- ✅ Sistema de sesiones para autenticación

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor:
```bash
npm start
```

O para desarrollo con auto-reload:
```bash
npm run dev
```

3. El servidor estará disponible en `http://localhost:3000`

## Credenciales por Defecto

Al iniciar el servidor por primera vez, se crea automáticamente un usuario administrador:

- **Email:** `admin@bienesraices.com`
- **Contraseña:** `admin123`

⚠️ **IMPORTANTE:** Cambia estas credenciales en producción.

### Registro de Nuevos Administradores

Puedes registrar nuevos administradores desde la página de login:
1. Ve a `/admin/login`
2. Haz clic en "¿No tienes cuenta? Regístrate aquí"
3. Completa el formulario de registro
4. La contraseña debe tener al menos 6 caracteres

## Uso

### Panel de Administración

1. Accede a `http://localhost:3000/admin/login`
2. Inicia sesión con las credenciales por defecto
3. Desde el panel podrás:
   - Agregar nuevas propiedades
   - Ver todas las propiedades
   - Eliminar propiedades

### Frontend Público

- **Página principal:** `http://localhost:3000/` - Muestra las primeras 3 propiedades
- **Todas las propiedades:** `http://localhost:3000/anuncios.html` - Lista completa
- **Detalle de propiedad:** `http://localhost:3000/anuncio.html?id=1` - Detalle de una propiedad específica

## Estructura del Proyecto

```
bienesraices_fin/
├── database/
│   └── db.js              # Configuración de base de datos
├── routes/
│   ├── auth.js            # Rutas de autenticación
│   ├── propiedades.js    # Rutas públicas de propiedades
│   └── admin.js           # Rutas de administración
├── server.js              # Servidor principal
├── admin.html             # Panel de administración
├── admin-login.html       # Página de login
└── [archivos HTML del frontend]
```

## API Endpoints

### Públicos
- `GET /api/propiedades` - Obtener todas las propiedades
- `GET /api/propiedades/:id` - Obtener una propiedad por ID

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar nuevo administrador
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/check` - Verificar sesión activa

### Administración (requiere autenticación)
- `GET /api/admin/propiedades` - Obtener todas las propiedades (admin)
- `POST /api/admin/propiedades` - Crear nueva propiedad
- `DELETE /api/admin/propiedades/:id` - Eliminar propiedad

## Base de Datos

El proyecto usa SQLite. La base de datos se crea automáticamente en `database/bienesraices.db` al iniciar el servidor por primera vez.

### Tablas
- **propiedades:** Almacena la información de las propiedades
- **usuarios:** Almacena los usuarios administradores

### Datos Iniciales

Al iniciar el servidor por primera vez:
- Se crea un usuario administrador por defecto
- Se agregan 3 propiedades de ejemplo si la tabla está vacía
- Puedes eliminar o modificar estas propiedades desde el panel de administración

## Notas

- Las imágenes se guardan en `build/img/`
- La base de datos SQLite se crea automáticamente
- Las sesiones se almacenan en memoria (reinicia al reiniciar el servidor)

## Desarrollo

Para desarrollo, se recomienda usar `npm run dev` que usa nodemon para auto-reload del servidor.

>>>>>>> cfb7115 (Versión inicial)
