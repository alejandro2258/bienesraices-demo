# 🚀 Cómo Iniciar el Servidor

## Método 1: Usando el Script (Más Fácil)

### En Mac/Linux:
1. Abre la Terminal
2. Ve a la carpeta del proyecto:
   ```bash
   cd /Users/alejandromolina/Downloads/bienesraices_fin
   ```
3. Ejecuta:
   ```bash
   ./iniciar-servidor.sh
   ```

### En Windows:
1. Abre el Explorador de Archivos
2. Ve a la carpeta del proyecto
3. Haz doble clic en `iniciar-servidor.bat`

## Método 2: Manualmente (Desde Terminal)

### En Mac/Linux/Windows:

1. **Abre la Terminal (o CMD en Windows)**

2. **Navega a la carpeta del proyecto:**
   ```bash
   cd /Users/alejandromolina/Downloads/bienesraices_fin
   ```
   (En Windows sería algo como: `cd C:\Users\TuUsuario\Downloads\bienesraices_fin`)

3. **Inicia el servidor:**
   ```bash
   npm start
   ```

4. **Deberías ver:**
   ```
   Servidor corriendo en http://localhost:3000
   ```

5. **Abre tu navegador en:** `http://localhost:3000`

## ⚠️ Importante

- **NO cierres la terminal** mientras uses el servidor
- Para detener el servidor, presiona `Ctrl+C` en la terminal
- Si cierras la terminal, el servidor se detendrá

## 🔧 Si el Puerto 3000 Está Ocupado

Si ves un error de que el puerto 3000 está en uso:

### En Mac/Linux:
```bash
lsof -ti:3000 | xargs kill -9
```

### En Windows:
```bash
netstat -ano | findstr :3000
# Luego usa el PID para matar el proceso:
taskkill /F /PID [número_del_PID]
```

## 📝 Atajos Rápidos

### Crear un alias (Mac/Linux):
Agrega esto a tu `~/.zshrc` o `~/.bashrc`:
```bash
alias bienesraices='cd /Users/alejandromolina/Downloads/bienesraices_fin && npm start'
```

Luego solo escribe: `bienesraices`

### Crear un acceso directo (Windows):
1. Clic derecho en `iniciar-servidor.bat`
2. "Crear acceso directo"
3. Arrastra el acceso directo al escritorio

## 🎯 Verificación

Una vez iniciado, deberías poder acceder a:
- ✅ `http://localhost:3000` - Página principal
- ✅ `http://localhost:3000/admin/login` - Panel de administración

