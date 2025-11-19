# Instrucciones de Uso

## 🚀 Cómo usar el proyecto

### Opción 1: Con el servidor Node.js (RECOMENDADO)

1. **Iniciar el servidor:**
   ```bash
   npm start
   ```

2. **Abrir en el navegador:**
   - Página principal: `http://localhost:3000`
   - Panel de admin: `http://localhost:3000/admin/login`

3. **Credenciales por defecto:**
   - Email: `admin@bienesraices.com`
   - Contraseña: `admin123`

### Opción 2: Con Live Server (Solo visualización)

Si abres `index.html` con Live Server:
- ✅ Verás las propiedades de ejemplo
- ❌ NO podrás agregar/editar/eliminar propiedades
- ❌ NO podrás iniciar sesión en el panel admin

**Nota:** Live Server solo muestra datos de ejemplo. Para usar todas las funcionalidades, necesitas el servidor Node.js corriendo.

## 🔧 Solución de Problemas

### No puedo iniciar sesión

1. **Verifica que el servidor esté corriendo:**
   ```bash
   npm start
   ```
   Debes ver: `Servidor corriendo en http://localhost:3000`

2. **Asegúrate de acceder desde:**
   - `http://localhost:3000/admin/login`
   - NO desde Live Server

3. **Verifica las credenciales:**
   - Email: `admin@bienesraices.com`
   - Contraseña: `admin123`

### Las propiedades no aparecen

1. Si usas **Live Server**: Verás propiedades de ejemplo automáticamente
2. Si usas **localhost:3000**: Asegúrate de que el servidor esté corriendo

### Error al editar propiedades

1. Asegúrate de estar logueado correctamente
2. Verifica que el servidor esté corriendo
3. Revisa la consola del navegador (F12) para ver errores

## 📝 Notas Importantes

- El servidor debe estar corriendo para usar el panel de administración
- Las sesiones solo funcionan cuando accedes desde `localhost:3000`
- Live Server es útil solo para ver el diseño, no para usar funcionalidades completas




