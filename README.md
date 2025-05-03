# Bitácora de Frases Graciosas - Aplicación inspirada en Threads

Este proyecto consiste en la creación de una aplicación para el registro de frases graciosas del día a día en la oficina. La aplicación está desarrollada con Next.js para el front-end y Node.js para el back-end. La base de datos en producción se encuentra en MongoDB Atlas. La aplicación está desplegada en Vercel por separado, donde por un lado se despliega la API y por otro lado el front-end.

## Descripción del Proyecto

La aplicación permite a los usuarios:

- Registrar frases graciosas del día a día en la oficina.
- Visualizar un timeline de las frases graciosas registradas por los usuarios.
- Dar like a las frases.
- Compartir frases en WhatsApp.
- Crear y editar un perfil de usuario.
- Agregar comentarios a los posts.
- Agregar GIFs tanto a los posts como a los comentarios.

## Instrucciones de Uso

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/Andres-ann/bitacora-up.git
```

2. Instala las dependencias del front-end y el back-end:

Para el front-end:

```bash
cd frontend
npm install
```

Para el back-end:

```bash
cd backend
npm install
```

3. Configura las variables de entorno:

- Crea un archivo `.env` en el directorio `backend` con las siguientes variables:

  ```env
  PORT=<puerto>
  MONGODB_URI=<conexion-mongodb>
  SECRET_KEY=<tu-secret-key>
  CLOUD_NAME=<nombre-servidor-cloudinary>
  CLOUD_API_KEY=<api-key-cloudinary>
  CLOUD_API_SECRET=<secret-cloudinary>
  ```

- Crea un archivo `.env.local` en el directorio `frontend` con las siguientes variables:
  ```env
  API_URL=<base-url-api>
  JWT_SECRET=<tu-secret-key>
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<nombre-servidor-cloudinary>
  NEXT_PUBLIC_GIPHY_API_KEY=<giphy-api-key>
  ```

4. Inicia la aplicación:

Para el back-end:

```bash
cd backend
npm run dev
```

Para el front-end:

```bash
cd frontend
npm run dev
```

5. Accede a la aplicación en tu navegador en `http://localhost:3000`.

## Tecnologías Utilizadas

- **Front-end:** Next.js, React.
- **Back-end:** Node.js, Express, MongoDB, Mongoose.
- **Otros:** Cloudinary para la gestión de imágenes, GIPHY para la gestión de GIFs, JWT para autenticación, y Multer para la subida de archivos.

## Contribuciones

Si deseas contribuir al proyecto, por favor sigue los pasos a continuación:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad o corrección de errores:
   ```bash
   git checkout -b mi-nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "feat: Agrega mi nueva funcionalidad"
   ```
4. Sube tus cambios a tu repositorio:
   ```bash
   git push origin mi-nueva-funcionalidad
   ```
5. Abre un Pull Request en este repositorio.

## Licencia

Este proyecto está bajo la licencia ISC.
