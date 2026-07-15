# ComercioTech - Backend API 🚀

Este es el backend de **ComercioTech**, una API REST robusta construida con Node.js, Express y MongoDB. Está diseñada para gestionar el panel de administración central, controlando el directorio de clientes, el catálogo de productos con control de stock y el flujo completo de pedidos mediante relaciones de bases de datos.

---

## 🛠️ Tecnologías y Herramientas Utilizadas

El proyecto utiliza un conjunto de tecnologías modernas para garantizar la seguridad, consistencia de datos y facilidad de despliegue:

* **Entorno de Ejecución:** [Node.js](https://nodejs.org/) (Motor de JavaScript del lado del servidor)
* **Framework Web:** [Express.js](https://expressjs.com/) (Creación de rutas y API RESTful)
* **Base de Datos NoSQL:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Base de datos en la nube)
* **Modelado de Datos:** [Mongoose](https://mongoosejs.com/) (ODM para validación, casteo y relaciones seguras como `.populate()`)
* **Variables de Entorno:** [Dotenv](https://www.npmjs.com/package/dotenv) (Seguridad de credenciales)
* **Intercambio de Recursos:** [CORS](https://www.npmjs.com/package/cors) (Seguridad para permitir peticiones desde el Frontend de Vercel)
* **Control de Versiones:** Git & GitHub
* **Hosting de Producción:** [Render](https://render.com/)

---

## 📌 Arquitectura y Endpoints de la API

La base de datos utiliza tres colecciones principales vinculadas de manera relacional:

### 1. Clientes (`/api/clientes`)

* `GET /api/clientes` - Obtener todos los clientes.
* `POST /api/clientes` - Registrar un nuevo cliente (campos: nombre, rut, username, comuna, region).
* `PUT /api/clientes/:id` - Actualizar datos de un cliente.
* `DELETE /api/clientes/:id` - Eliminar un cliente.

### 2. Productos (`/api/productos`)

* `GET /api/productos` - Obtener el catálogo completo.
* `POST /api/productos` - Crear un producto (campos: nombre, precio, categoria, stock).
* `PUT /api/productos/:id` - Actualizar información o reponer stock.
* `DELETE /api/productos/:id` - Eliminar un producto.

### 3. Pedidos (`/api/pedidos`)

* `GET /api/pedidos` - Obtener el historial de pedidos (utiliza `.populate()` para cruzar la información real del cliente y del producto).
* `POST /api/pedidos` - Registrar un pedido (asocia mediante `ObjectId` al cliente y al producto, junto con cantidad, estado y fecha).
* `PUT /api/pedidos/:id` - Cambiar el estado del pedido (Pendiente, En preparación, Enviado, Completado).
* `DELETE /api/pedidos/:id` - Eliminar un pedido.

---

## 💻 Instalación y Configuración Local

Sigue estos pasos para clonar y ejecutar el servidor en tu entorno de desarrollo local:

### Prerrequisitos

* Tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior recomendada).
* Una cuenta y un clúster configurado en [MongoDB Atlas](https://www.mongodb.com/).

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/Michprogram/ComercioTech-backend.git
cd ComercioTech-backend
```

### Paso 2: Instalar Dependencias

Instala todos los paquetes requeridos por el backend:

```bash
npm install
```

### Paso 3: Configurar Variables de Entorno

Crea un archivo llamado `.env` en la raíz del proyecto y agrega tus claves privadas de acceso:

```
PORT=5000
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/comerciotech?retryWrites=true&w=majority
```

⚠️ **Nota:** Asegúrate de reemplazar `<usuario>` y `<password>` con tus credenciales seguras de MongoDB Atlas creadas en Database Access.

### Paso 4: Iniciar el Servidor

Modo Producción:

```bash
npm start
```

Modo Desarrollo (con recarga automática si usas nodemon):

```bash
npm run dev
```

El servidor debería iniciar con éxito y mostrar un mensaje confirmando la conexión segura a MongoDB Atlas:

```
Servidor corriendo en el puerto 5000
Conectado exitosamente a MongoDB Atlas
```
