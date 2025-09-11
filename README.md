# 📱 Smart QR Generator

Un generador inteligente de códigos QR desarrollado en Node.js que te permite convertir diferentes tipos de información en códigos QR de manera fácil e intuitiva.

## 🚀 ¿Qué Problema Resuelve?

En nuestra era digital, necesitamos formas rápidas de **compartir información**:
- **URLs largas** que son difíciles de escribir
- **Datos de contacto** que tardan en introducir manualmente  
- **Contraseñas de WiFi** complicadas de compartir
- **Ubicaciones GPS** precisas para eventos
- **Información de redes sociales** para conectar rápidamente

**Smart QR Generator** soluciona esto convirtiendo cualquier información en un código QR escaneabe que puede leerse instantáneamente con cualquier smartphone.

## 📋 Características Principales

### ✨ Tipos de QR Soportados
- **🌐 URLs/Páginas Web** - Enlaces directos
- **💬 Mensajes de Texto** - Texto plano
- **📞 Contactos vCard** - Información de contacto completa
- **📧 Email** - Con asunto y mensaje predefinido
- **📱 SMS** - Mensajes de texto con número y contenido
- **📶 WiFi** - Conexión automática a redes inalámbricas
- **📍 Ubicaciones GPS** - Coordenadas geográficas precisas
- **🔗 Redes Sociales** - WhatsApp, Instagram, Facebook, Twitter, LinkedIn

### 🎯 Funcionalidades Avanzadas
- **Visualización en terminal** - Ve el QR directamente en la consola
- **Archivos PNG de alta calidad** - Guardado automático en 400x400px
- **Validación inteligente** - URLs auto-corregidas, datos verificados
- **Interfaz intuitiva** - Menús fáciles de navegar
- **Organización automática** - Archivos guardados con nombres descriptivos

## 🛠️ Librería NPM Utilizada

### **QRCode** 📦
- **Link oficial**: https://www.npmjs.com/package/qrcode
- **Versión**: 1.5.4
- **Descargas semanales**: ~3 millones
- **Mantenimiento**: Activo y bien mantenido

### 🎯 ¿Por Qué Elegí Esta Librería?

1. **⚡ Facilidad de Uso**: API simple y directa
   ```javascript
   QRCode.toString(data, { type: 'terminal' }); // Terminal
   QRCode.toFile('archivo.png', data);          // Archivo PNG
   ```

2. **🔧 Versatilidad**: 
   - Soporte para terminal (ASCII)
   - Generación de archivos PNG, SVG
   - Control total sobre colores y tamaño
   - Diferentes niveles de corrección de errores

3. **📊 Confiabilidad**:
   - Usado por más de 3,500 proyectos en NPM
   - Estándar de la industria para QR codes en Node.js
   - Documentación excelente y completa

## 🔧 Instalación y Uso

### Prerrequisitos
- **Node.js** versión 12.0.0 o superior
- **npm** (incluido con Node.js)

### 📦 Instalación Rápida

1. **Clona el repositorio**:
```bash
git clone https://github.com/Deamacevedo/smart-qr-generator
cd smart-qr-generator
```

2. **Instala las dependencias**:
```bash
npm install
```

3. **Ejecuta la aplicación**:
```bash
node main-simple.js
```

### 🔧 Instalación Global (Opcional)
```bash
npm install -g .
qrcode
```

## 🎮 Guía de Uso Paso a Paso

### 1. **Menú Principal**
Al ejecutar la aplicación verás:
```
📱         GENERADOR DE CÓDIGOS QR INTELIGENTE         📱
🚀     Convierte cualquier información en QR Code     🚀

🎯 ¿Qué tipo de QR Code quieres generar?

1. 🌐 URL/Página Web
2. 💬 Mensaje de Texto
3. 📞 Contacto (vCard)
4. 📧 Email
5. 📱 SMS
6. 📶 WiFi
7. 📍 Ubicación GPS
8. 🔗 Redes Sociales
9. 🚪 Salir
```

### 2. **Ejemplos de Uso**

#### 🌐 **Generar QR para URL**
```
Opción: 1
Ingresa la URL: www.google.com
✅ Resultado: QR code que lleva a http://www.google.com
```

#### 📶 **Generar QR para WiFi**
```
Opción: 6
Nombre de la red (SSID): MiWiFi_Casa
Contraseña: miContraseña123
Tipo de seguridad: WPA
✅ Resultado: QR que conecta automáticamente al WiFi
```

#### 📞 **Generar QR para Contacto**
```
Opción: 3
Nombre completo: Juan Pérez
Teléfono: +57 300 1234567
Email: juan.perez@email.com
Empresa: Mi Empresa
✅ Resultado: vCard que se guarda automáticamente en contactos
```

### 3. **Salida del Programa**

Cada QR generado produce:
- **📱 Visualización en terminal** (ASCII art)
- **📁 Archivo PNG** guardado en carpeta `qr_codes/`

## 🏗️ Estructura del Proyecto

```
smart-qr-generator/
├── main.js                  # Aplicación principal (funcional)
├── package.json                    # Configuración del proyecto
├── .gitignore                      # Archivos ignorados por Git
├── qr_codes/                       # Directorio de códigos generados
│   ├── url_1234567890.png
│   ├── wifi_MiWiFi_Casa_1234567891.png
│   └── contacto_Juan_Perez_1234567892.png
└── README.md                       # Documentación
```

### Ventajas del Enfoque Funcional
- **🎯 Simplicidad** - Cada función tiene una responsabilidad
- **📚 Fácil de aprender** - No requiere conocimiento de POO
- **🔧 Modificable** - Agregar nuevos tipos de QR es sencillo
- **🚀 Directo** - Flujo de ejecución lineal

### Características Técnicas Clave

**🔍 Validación Inteligente**:
   ```javascript
   validateURL(string) {
     if (!/^https?:\/\//i.test(string)) {
       return `http://${string}`;  // Auto-agregar protocolo
     }
     return string;
   }
   ```

## 📊 Ejemplos de Códigos QR Generados

### 🌐 **URL Example**
```
Entrada: "https://github.com"
QR Data: "https://github.com"
Archivo: url_1641234567890.png
```

### 📶 **WiFi Example** 
```
Entrada: SSID="CafeteriaCentral", Password="cafe123", Security="WPA"
QR Data: "WIFI:T:WPA;S:CafeteriaCentral;P:cafe123;;"
Archivo: wifi_CafeteriaCentral_1641234567891.png
```

### 📞 **Contact Example**
```
Entrada: Nombre="Ana García", Tel="+57 301 555 0123", Email="ana@empresa.com"
QR Data: vCard completo
Archivo: contacto_Ana_Garcia_1641234567892.png
```

## 🎥 Video Sustentación

**🔗 Link del Video**: [[Click aquí](https://youtu.be/Uxe-2ODp7jM)]


## 🚀 Casos de Uso Reales

### 🏢 **Empresariales**
- **Tarjetas de presentación digitales**
- **WiFi para oficinas y eventos**
- **URLs de presentaciones y documentos**

### 🍕 **Restaurantes y Negocios**
- **Menús digitales** sin contacto
- **Enlaces a redes sociales**
- **Información de ubicación**

### 🎓 **Educación**
- **Recursos de clase** rápidos
- **Contacto de profesores**
- **Ubicaciones de campus**

### 👥 **Personal**
- **Compartir contactos** en eventos
- **WiFi de casa** para invitados
- **Ubicaciones de reuniones**

## 👨‍💻 Autores

- **Dylan Acevedo**
- **Davisson Roman**
- **Jeferson Lopez**
