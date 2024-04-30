# Bitácora de Frases Graciosas - Aplicación inspirada en Twitter

Este proyecto consiste en la creación de una aplicación inspirada en Twitter para el registro de frases graciosas del día a día en la oficina. La aplicación está desarrollada con Angular para el front-end y Node.js para el back-end. La base de datos en producción se encuentra en MongoDB Atlas. La aplicación está desplegada en Vercel por separado, donde por un lado se despliega la API y por otro lado el front-end.

## Descripción del Proyecto

La aplicación permite a los usuarios:

  - Registrar frases graciosas del día a día en la oficina.
  - Visualizar un timeline de las frases graciosas registradas por los usuarios.
  - Dar like a las frases.
  - Compartir frases graciosas en whatsapp.

## Instrucciones de Uso

1. Clona este repositorio en tu máquina local:

  git clone https://github.com/Andres-ann/bitacora-up.git

2. Instala las dependencias del front-end y el back-end:

  Para el front-end:
    cd frontend
    
    npm install
    

  Para el back-end:
    cd backend
   
    npm install
    
    
3. Configura las variables de entorno:

Crea un archivo `.env` en el directorio `backend` con la siguiente estructura:

    PORT=3000
    MONGODB_URI=your_mongodb_uri

4. Ejecuta el servidor back-end:

    cd backend
   ```bash
    npm start
    ```
6. Ejecuta la aplicación front-end:

    cd frontend
   ```bash
    npm start
   ```
8. Abre la aplicación en tu navegador web y comienza a registrar y disfrutar de las frases graciosas.

## Tecnologías Utilizadas

### Front-end

- Angular
- Bootstrap
- FontAwesome

### Back-end

- Node.js
- Express
- MongoDB (con Mongoose para la interacción)

## Inspiración

Este proyecto se inspira en la necesidad de tener una aplicación divertida y ligera para registrar y compartir frases graciosas en el entorno laboral, así como en la aplicación de los conocimientos adquiridos en el desarrollo web de aplicaciones Fullstack MEAN.

## Contribución

Siéntete libre de contribuir a este proyecto abriendo un pull request. ¡Todas las sugerencias y mejoras son bienvenidas!

## Licencia

Este proyecto está bajo la licencia [ISC](LICENSE).
