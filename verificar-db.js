// Script para verificar el estado de la base de datos
const db = require('./database/db');

console.log('=== Verificación de Base de Datos ===\n');

try {
    // Verificar conexión
    console.log('1. Verificando conexión a la base de datos...');
    const test = db.db.prepare('SELECT 1').get();
    console.log('✓ Conexión exitosa\n');

    // Contar propiedades
    console.log('2. Verificando propiedades...');
    const propiedades = db.propiedades.getAll();
    console.log(`   Total de propiedades: ${propiedades.length}`);
    
    if (propiedades.length > 0) {
        console.log('   Propiedades encontradas:');
        propiedades.forEach((prop, index) => {
            console.log(`   ${index + 1}. ${prop.titulo} - $${prop.precio} (ID: ${prop.id})`);
        });
    } else {
        console.log('   ⚠️  No hay propiedades en la base de datos');
        console.log('   La base de datos se inicializará automáticamente al iniciar el servidor');
    }
    console.log('');

    // Contar usuarios
    console.log('3. Verificando usuarios...');
    const usuarios = db.usuarios.getAll();
    console.log(`   Total de usuarios: ${usuarios.length}`);
    
    if (usuarios.length > 0) {
        console.log('   Usuarios encontrados:');
        usuarios.forEach((user, index) => {
            console.log(`   ${index + 1}. ${user.email} (ID: ${user.id})`);
        });
    } else {
        console.log('   ⚠️  No hay usuarios en la base de datos');
    }
    console.log('');

    console.log('=== Verificación completada ===');
    
} catch (error) {
    console.error('❌ Error al verificar la base de datos:', error.message);
    console.error(error);
    process.exit(1);
}

process.exit(0);





