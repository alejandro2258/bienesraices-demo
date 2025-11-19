# 🚀 Guía de Despliegue en Host

## ⚠️ IMPORTANTE: No subas todo directamente

**NO puedes simplemente subir el proyecto en un ZIP a cualquier host.** Necesitas un host que soporte Node.js.

## 📋 Requisitos del Host

Tu host debe soportar:
- ✅ **Node.js** (versión 14 o superior)
- ✅ **npm** (gestor de paquetes)
- ✅ **Base de datos SQLite** (o cambiar a otra base de datos)
- ✅ **Proceso en segundo plano** (PM2, forever, o similar)

## 🌐 Hosts Recomendados

### Opción 1: Hosts con Node.js (Recomendado)
- **Heroku** (gratis con limitaciones)
- **Railway** (gratis con límites)
- **Render** (gratis con límites)
- **DigitalOcean App Platform**
- **Vercel** (solo frontend, necesitarías separar)
- **Netlify** (solo frontend, necesitarías separar)

### Opción 2: VPS (Servidor Virtual)
- **DigitalOcean Droplet**
- **Linode**
- **Vultr**
- **AWS EC2**

## 📦 Qué INCLUIR en el ZIP

✅ **SÍ incluir:**
```
bienesraices_fin/
├── server.js
├── package.json
├── package-lock.json
├── database/
│   └── db.js
├── routes/
│   ├── auth.js
│   ├── propiedades.js
│   └── admin.js
├── build/          (archivos compilados)
├── src/            (opcional, si quieres recompilar)
├── *.html          (todas las páginas HTML)
└── README.md
```

## ❌ Qué NO incluir en el ZIP

❌ **NO incluir:**
- `node_modules/` - Se instala en el servidor con `npm install`
- `database/bienesraices.db` - Se crea automáticamente
- `.git/` - Si usas Git
- `.DS_Store` - Archivos del sistema
- `*.log` - Archivos de log

## 🔧 Pasos para Desplegar

### 1. Preparar el proyecto localmente

```bash
# Crear un ZIP sin node_modules y base de datos
zip -r bienesraices.zip . \
  -x "node_modules/*" \
  -x "database/*.db" \
  -x "database/*.db-journal" \
  -x ".git/*" \
  -x "*.log" \
  -x ".DS_Store"
```

### 2. En el servidor/host

```bash
# 1. Subir el ZIP y descomprimirlo
unzip bienesraices.zip

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
npm start
# O con PM2 para mantenerlo corriendo:
pm2 start server.js
```

## ⚙️ Configuración Necesaria

### Variables de Entorno

Crea un archivo `.env` en el servidor:

```env
PORT=3000
NODE_ENV=production
SESSION_SECRET=tu-secreto-super-seguro-aqui
```

Y modifica `server.js` para leerlas:

```javascript
require('dotenv').config();
const PORT = process.env.PORT || 3000;
```

### Cambios Necesarios en el Código

1. **Cambiar el secreto de sesión** en `server.js`:
```javascript
secret: process.env.SESSION_SECRET || 'cambiar-este-secreto-en-produccion'
```

2. **Configurar HTTPS** si es necesario:
```javascript
cookie: {
    secure: true, // Cambiar a true en producción con HTTPS
    maxAge: 24 * 60 * 60 * 1000
}
```

## 🔒 Seguridad

1. **Cambiar credenciales por defecto:**
   - Cambia la contraseña del admin después del primer login
   - O elimina el usuario por defecto y crea uno nuevo

2. **Proteger rutas admin:**
   - Ya está protegido con sesiones
   - Considera agregar rate limiting

3. **HTTPS:**
   - Usa HTTPS en producción
   - Configura certificado SSL (Let's Encrypt es gratis)

## 📝 Checklist Pre-Despliegue

- [ ] Eliminar `node_modules` del ZIP
- [ ] Eliminar archivos de base de datos del ZIP
- [ ] Verificar que `.gitignore` esté incluido
- [ ] Cambiar secreto de sesión
- [ ] Configurar variables de entorno
- [ ] Probar localmente antes de subir
- [ ] Hacer backup de la base de datos si ya tienes datos

## 🆘 Problemas Comunes

### "Cannot find module"
- Ejecuta `npm install` en el servidor

### "Port already in use"
- Cambia el puerto en las variables de entorno
- O detén el proceso que usa el puerto

### "Database locked"
- SQLite puede tener problemas con múltiples procesos
- Considera usar PostgreSQL o MySQL en producción

### Sesiones no funcionan
- Verifica que las cookies estén habilitadas
- Configura CORS correctamente
- Usa HTTPS en producción

## 💡 Recomendación

Para producción, considera:
1. **Cambiar SQLite por PostgreSQL o MySQL** (más robusto)
2. **Usar variables de entorno** para configuración
3. **Implementar logs** para debugging
4. **Usar PM2** para mantener el servidor corriendo
5. **Configurar backup automático** de la base de datos

## 📞 ¿Necesitas ayuda?

Si tienes problemas específicos con tu host, comparte:
- Qué host estás usando
- Qué error ves
- Logs del servidor

