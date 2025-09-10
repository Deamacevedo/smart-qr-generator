#!/usr/bin/env node

const QRCode = require('qrcode');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Configuración global
const outputDir = path.join(__dirname, 'qr_codes');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Crear interfaz para input del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función auxiliar para hacer preguntas
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

// Mostrar título de la aplicación
function showTitle() {
    console.clear();
    console.log('\n' + '='.repeat(60));
    console.log('📱         GENERADOR DE CÓDIGOS QR INTELIGENTE         📱');
    console.log('🚀     Convierte cualquier información en QR Code     🚀');
    console.log('='.repeat(60));
    console.log('');
}

// Menú principal
async function showMenu() {
    console.log('🎯 ¿Qué tipo de QR Code quieres generar?\n');
    console.log('1. 🌐 URL/Página Web');
    console.log('2. 💬 Mensaje de Texto');
    console.log('3. 📞 Contacto (vCard)');
    console.log('4. 📧 Email');
    console.log('5. 📱 SMS');
    console.log('6. 📶 WiFi');
    console.log('7. 📍 Ubicación GPS');
    console.log('8. 🔗 Redes Sociales');
    console.log('9. 🚪 Salir\n');

    return await askQuestion('Selecciona una opción (1-9): ');
}

// Validar URL
function validateURL(string) {
    if (!/^https?:\/\//i.test(string)) {
        return `http://${string}`;
    }
    return string;
}

// Función principal para generar el QR
async function generateQR(data, filename, tipo) {
    try {
        console.log('\n🔄 Generando código QR...\n');

        // Generar QR en la terminal
        const qrTerminal = await QRCode.toString(data, { type: 'terminal' });
        console.log('📱 Tu código QR:');
        console.log(qrTerminal);

        // Generar archivo PNG
        const filepath = path.join(outputDir, `${filename}.png`);
        await QRCode.toFile(filepath, data, {
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            },
            margin: 2,
            width: 400
        });

        // Mostrar información
        console.log('✅ ¡Código QR generado exitosamente!');
        console.log(`📁 Guardado en: ${filepath}`);
        console.log(`🎯 Tipo: ${tipo}`);
        console.log(`📏 Tamaño: 400x400 px`);
        console.log(`💾 Formato: PNG\n`);

        // Mostrar datos codificados
        console.log('📋 Datos codificados:');
        console.log(`"${data}"\n`);

        // Preguntar si quiere generar más códigos
        const continuar = await askQuestion('¿Quieres generar otro código QR? (s/n): ');
        if (continuar.toLowerCase() === 's' || continuar.toLowerCase() === 'si') {
            await run();
        } else {
            showSummary();
        }

    } catch (error) {
        console.log('❌ Error al generar el código QR:', error.message);
    }
}

// Generar QR para URL
async function generateURL() {
    console.clear();
    showTitle();
    console.log('🌐 GENERADOR QR PARA URL\n');

    const url = await askQuestion('Ingresa la URL (ej: https://www.google.com): ');
    
    if (!url) {
        console.log('❌ URL no puede estar vacía');
        return;
    }

    const validUrl = validateURL(url);
    await generateQR(validUrl, `url_${Date.now()}`, 'URL');
}

// Generar QR para texto
async function generateText() {
    console.clear();
    showTitle();
    console.log('💬 GENERADOR QR PARA TEXTO\n');

    const text = await askQuestion('Ingresa tu mensaje: ');
    
    if (!text) {
        console.log('❌ El texto no puede estar vacío');
        return;
    }

    await generateQR(text, `texto_${Date.now()}`, 'Texto');
}

// Generar QR para contacto (vCard)
async function generateContact() {
    console.clear();
    showTitle();
    console.log('📞 GENERADOR QR PARA CONTACTO\n');

    const nombre = await askQuestion('Nombre completo: ');
    const telefono = await askQuestion('Teléfono: ');
    const email = await askQuestion('Email (opcional): ');
    const empresa = await askQuestion('Empresa (opcional): ');

    // Crear vCard
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${nombre}
TEL:${telefono}
${email ? `EMAIL:${email}` : ''}
${empresa ? `ORG:${empresa}` : ''}
END:VCARD`;

    await generateQR(vcard, `contacto_${nombre.replace(/\s+/g, '_')}_${Date.now()}`, 'Contacto');
}

// Generar QR para email
async function generateEmail() {
    console.clear();
    showTitle();
    console.log('📧 GENERADOR QR PARA EMAIL\n');

    const email = await askQuestion('Email destinatario: ');
    const asunto = await askQuestion('Asunto (opcional): ');
    const mensaje = await askQuestion('Mensaje (opcional): ');

    const emailData = `mailto:${email}${asunto ? `?subject=${encodeURIComponent(asunto)}` : ''}${mensaje ? `&body=${encodeURIComponent(mensaje)}` : ''}`;

    await generateQR(emailData, `email_${Date.now()}`, 'Email');
}

// Generar QR para SMS
async function generateSMS() {
    console.clear();
    showTitle();
    console.log('📱 GENERADOR QR PARA SMS\n');

    const numero = await askQuestion('Número de teléfono: ');
    const mensaje = await askQuestion('Mensaje (opcional): ');

    const smsData = `sms:${numero}${mensaje ? `?body=${encodeURIComponent(mensaje)}` : ''}`;

    await generateQR(smsData, `sms_${Date.now()}`, 'SMS');
}

// Generar QR para WiFi
async function generateWiFi() {
    console.clear();
    showTitle();
    console.log('📶 GENERADOR QR PARA WiFi\n');
    console.log('Genera un QR que permite conectarse automáticamente a tu WiFi\n');

    const ssid = await askQuestion('Nombre de la red (SSID): ');
    const password = await askQuestion('Contraseña: ');
    const security = await askQuestion('Tipo de seguridad (WPA/WEP/abierta) - presiona Enter para WPA: ') || 'WPA';

    const wifiData = `WIFI:T:${security.toUpperCase()};S:${ssid};P:${password};;`;

    await generateQR(wifiData, `wifi_${ssid.replace(/\s+/g, '_')}_${Date.now()}`, 'WiFi');
}

// Generar QR para ubicación GPS
async function generateLocation() {
    console.clear();
    showTitle();
    console.log('📍 GENERADOR QR PARA UBICACIÓN GPS\n');

    const latitud = await askQuestion('Latitud (ej: 4.6097): ');
    const longitud = await askQuestion('Longitud (ej: -74.0817): ');
    const nombre = await askQuestion('Nombre del lugar (opcional): ');

    if (!latitud || !longitud) {
        console.log('❌ Latitud y longitud son obligatorias');
        return;
    }

    const locationData = `geo:${latitud},${longitud}${nombre ? `?q=${latitud},${longitud}(${encodeURIComponent(nombre)})` : ''}`;

    await generateQR(locationData, `ubicacion_${Date.now()}`, 'Ubicación');
}

// Generar QR para redes sociales
async function generateSocial() {
    console.clear();
    showTitle();
    console.log('🔗 GENERADOR QR PARA REDES SOCIALES\n');
    console.log('1. WhatsApp');
    console.log('2. Instagram');
    console.log('3. Facebook');
    console.log('4. Twitter/X');
    console.log('5. LinkedIn\n');

    const opcion = await askQuestion('Selecciona la red social (1-5): ');
    
    let socialData = '';
    let tipo = '';

    switch(opcion) {
        case '1':
            const whatsapp = await askQuestion('Número de WhatsApp (incluye código país): ');
            const mensaje = await askQuestion('Mensaje predefinido (opcional): ');
            socialData = `https://wa.me/${whatsapp}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ''}`;
            tipo = 'WhatsApp';
            break;
        case '2':
            const instagram = await askQuestion('Usuario de Instagram: ');
            socialData = `https://instagram.com/${instagram}`;
            tipo = 'Instagram';
            break;
        case '3':
            const facebook = await askQuestion('Usuario o página de Facebook: ');
            socialData = `https://facebook.com/${facebook}`;
            tipo = 'Facebook';
            break;
        case '4':
            const twitter = await askQuestion('Usuario de Twitter/X: ');
            socialData = `https://twitter.com/${twitter}`;
            tipo = 'Twitter';
            break;
        case '5':
            const linkedin = await askQuestion('Usuario de LinkedIn: ');
            socialData = `https://linkedin.com/in/${linkedin}`;
            tipo = 'LinkedIn';
            break;
        default:
            console.log('❌ Opción no válida');
            return;
    }

    await generateQR(socialData, `${tipo.toLowerCase()}_${Date.now()}`, tipo);
}

// Mostrar resumen al final
function showSummary() {
    console.clear();
    showTitle();
    
    console.log('🎉 ¡SESIÓN COMPLETADA!\n');
    console.log('📊 Resumen de tu sesión:');
    
    // Mostrar archivos generados
    try {
        const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.png'));
        console.log(`✅ Códigos QR generados: ${files.length}`);
        console.log(`📁 Ubicación: ${outputDir}\n`);
        
        if (files.length > 0) {
            console.log('📱 Archivos generados:');
            files.forEach((file, index) => {
                console.log(`   ${index + 1}. ${file}`);
            });
        }
    } catch (error) {
        console.log('📁 No se pudieron listar los archivos generados');
    }

    console.log('\n💡 Tips para usar tus códigos QR:');
    console.log('   • Escánealos con la cámara de tu celular');
    console.log('   • Compártelos en redes sociales');
    console.log('   • Imprímelos en tarjetas de presentación');
    console.log('   • Úsalos en menús de restaurantes');
    console.log('   • Agrégalos a tus presentaciones\n');

    console.log('🙏 ¡Gracias por usar QR Generator!');
    console.log('⭐ Desarrollado con la librería "qrcode" de NPM\n');
    
    rl.close();
}

// Función principal
async function run() {
    showTitle();
    
    const option = await showMenu();

    switch(option) {
        case '1':
            await generateURL();
            break;
        case '2':
            await generateText();
            break;
        case '3':
            await generateContact();
            break;
        case '4':
            await generateEmail();
            break;
        case '5':
            await generateSMS();
            break;
        case '6':
            await generateWiFi();
            break;
        case '7':
            await generateLocation();
            break;
        case '8':
            await generateSocial();
            break;
        case '9':
            showSummary();
            break;
        default:
            console.log('❌ Opción no válida. Intenta de nuevo.');
            await run();
    }
}

// Ejecutar la aplicación
if (require.main === module) {
    run().catch(console.error);
}

module.exports = { run, generateQR, askQuestion };