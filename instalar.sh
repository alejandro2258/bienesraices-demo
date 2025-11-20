#!/bin/bash

# Script automático de instalación para DreamHost
# Solo ejecuta este archivo después de subir los archivos por FTP

echo "🚀 Instalando tu sitio de bienes raíces..."
echo ""

# Ir a public_html (ajusta la ruta si tu dominio es diferente)
cd ~/$(whoami).$(hostname | cut -d. -f2-)/public_html 2>/dev/null || cd ~/*/public_html 2>/dev/null || cd ~/public_html 2>/dev/null || {
    echo "❌ No encontré la carpeta public_html"
    echo "Por favor, ve a la carpeta donde subiste los archivos:"
    echo "cd ~/tu-dominio.com/public_html"
    exit 1
}

echo "✅ Carpeta encontrada: $(pwd)"
echo ""

# Verificar que server.js existe
if [ ! -f "server.js" ]; then
    echo "❌ No encontré server.js en esta carpeta"
    echo "Asegúrate de estar en la carpeta donde subiste los archivos"
    exit 1
fi

echo "📦 Instalando dependencias..."
npm install --production

if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias"
    echo "Asegúrate de que Node.js esté instalado: node --version"
    exit 1
fi

echo ""
echo "📦 Instalando PM2 (para mantener el servidor corriendo)..."
npm install -g pm2

echo ""
echo "🚀 Iniciando el servidor..."
pm2 delete bienesraices 2>/dev/null
pm2 start server.js --name bienesraices
pm2 save

echo ""
echo "📋 Configurando inicio automático..."
pm2 startup

echo ""
echo "✅ ¡Todo listo!"
echo ""
echo "Tu sitio está corriendo. Para ver el estado:"
echo "  pm2 status"
echo ""
echo "Para ver los logs:"
echo "  pm2 logs bienesraices"
echo ""

