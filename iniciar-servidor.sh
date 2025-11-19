#!/bin/bash

# Script para iniciar el servidor de Bienes Raíces

echo "🚀 Iniciando servidor de Bienes Raíces..."
echo ""

# Cambiar al directorio del proyecto
cd "$(dirname "$0")"

# Verificar que estamos en el directorio correcto
if [ ! -f "server.js" ]; then
    echo "❌ Error: No se encontró server.js"
    echo "Asegúrate de ejecutar este script desde la carpeta del proyecto"
    exit 1
fi

# Verificar que node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    echo ""
fi

# Verificar si el puerto 3000 está en uso
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  El puerto 3000 ya está en uso"
    echo "¿Quieres detener el proceso existente? (s/n)"
    read -r respuesta
    if [ "$respuesta" = "s" ] || [ "$respuesta" = "S" ]; then
        echo "🛑 Deteniendo proceso en puerto 3000..."
        lsof -ti:3000 | xargs kill -9 2>/dev/null
        sleep 2
    else
        echo "❌ No se puede iniciar el servidor. Puerto 3000 ocupado."
        exit 1
    fi
fi

# Iniciar el servidor
echo "✅ Iniciando servidor en http://localhost:3000"
echo "📝 Presiona Ctrl+C para detener el servidor"
echo ""
npm start



