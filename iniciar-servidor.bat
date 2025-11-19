@echo off
REM Script para iniciar el servidor de Bienes Raíces (Windows)

echo.
echo 🚀 Iniciando servidor de Bienes Raices...
echo.

REM Cambiar al directorio del script
cd /d "%~dp0"

REM Verificar que estamos en el directorio correcto
if not exist "server.js" (
    echo ❌ Error: No se encontro server.js
    echo Asegurate de ejecutar este script desde la carpeta del proyecto
    pause
    exit /b 1
)

REM Verificar que node_modules existe
if not exist "node_modules" (
    echo 📦 Instalando dependencias...
    call npm install
    echo.
)

REM Verificar si el puerto 3000 está en uso (Windows)
netstat -ano | findstr :3000 >nul 2>&1
if %errorlevel% == 0 (
    echo ⚠️  El puerto 3000 ya esta en uso
    echo ¿Quieres detener el proceso existente? (s/n)
    set /p respuesta=
    if /i "%respuesta%"=="s" (
        echo 🛑 Deteniendo proceso en puerto 3000...
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
            taskkill /F /PID %%a >nul 2>&1
        )
        timeout /t 2 /nobreak >nul
    ) else (
        echo ❌ No se puede iniciar el servidor. Puerto 3000 ocupado.
        pause
        exit /b 1
    )
)

REM Iniciar el servidor
echo ✅ Iniciando servidor en http://localhost:3000
echo 📝 Presiona Ctrl+C para detener el servidor
echo.
call npm start

pause



