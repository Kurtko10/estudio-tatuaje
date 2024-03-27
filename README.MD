[![SVG Banners](https://svg-banners.vercel.app/api?type=typeWriter&text1=PROYECTO%20FORMATIVO%20👨‍💻&width=800&height=150)](https://github.com/Akshay090/svg-banners)

<H4 align="center">✒ESTUDIO DE TATUAJE✒</H4> 

<H6>Proyecto 4️⃣ del Bootcamp Full Stack Developer de Geekshubs Academy</H6>


** Creamos un proyecto de backend para un estudio de tatuajes utilizando Node.js, TypeScript, Express, TypeORM y MySQL. Emplea una base de datos relacional para almacenar datos de usuarios, artistas, clientes, citas, entre otros elementos relevantes para el funcionamiento del estudio.

** Dentro de esta aplicación, hemos implementado diversos puntos de acceso (endpoints) que permiten a los usuarios registrarse, iniciar sesión, acceder y gestionar información de las tablas de la base de datos. Estos endpoints facilitan la creación, actualización y eliminación de registros, proporcionando así una interfaz de programación robusta y completa para la gestión de datos del estudio de tatuajes.


## 📋 Contenido 

<details>

  <summary>📋Contenido📋</summary>
<ol>
    <li><a href="#tecnologías-utilizadas">Tecnologías Utilizadas</a></li>
    <li><a href="#diagrama-bd">Diagrama BD</a></li>
    <li><a href="#instrucciones">Instrucciones</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
    <li><a href="/LICENSE">Licencia</a></li>
</ol>

</details>

## Tecnologías

<details>
<summary>➿Tecnologías➿</summary>

<div align="center">

   <a href="https://www.expressjs.com/">
      <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
   </a>
   <a href="https://nodejs.org/en">
      <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
   </a>
   <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/typescript-blue?style=for-the-badge&logo=typescript&logoColor=white">
   </a>

</div>

</details>

## Diagrama Base de Datos

<p>
   <div align="center">
      <img src="/src/img/diagramaER.jpg" style="max-width: 100%">
   </div>    
</p>


<details>
<summary>⚙ Configuración ⚙</summary>

1. Clona este repositorio: `git clone [URL del repositorio]` 📥
2. Instalar las dependencias: `npm install ` 💾
3. Conectar repositorio con la base de datos mediante  variables de entorno que se encuentran en el archivo .env 📡

    ``` js
    // Environment 
	NODE_ENV= 

   // Server 
	PORT=

   // Database 
    	DB_HOST=
    	DB_PORT=
    	DB_USER=
    	DB_PASSWORD=
    	DB_DATABASE=  

   // Token
    	JWT_SECRET= ""
    ```  

4. Ejecutar las migraciones `npx typeorm-ts-node-commonjs migration:run -d ./src/database/data-source.ts` o `npm run db:migrate` ✈️
5. Para rellenar las tabla de datos ficticios `npx ts-node ./src/database/seeders/dbSeeder.ts` o `npm run db:seed` 📑
6. Lo hacemos funcionar con `npm run dev` 🚀
7. Utilizamos los endpoints en Insomnia o Postman para probar y validar las diversas funcionalidades implementadas 🎯

</details>

## Endpoints

<details>

<summary>🎯Endpoints🎯</summary>

<details>
<summary>🔒 Registro/Login 🔒</summary>

- ✅ **Registrar usuario/cliente**
    - `POST {{BASE_URL}}/api/auth/register`
    ![Register](/src/img/register.jpg)

- ✅ **Login usuarios**
    - `POST {{BASE_URL}}/api/auth/login`
    - ![Login](/src/img/Login1.jpg)
    - ![Token](/src/img/LoginToken.jpg)

</details>

<summary>📅 Citas 📅</summary>

- ✅ **Crear Nueva Cita (introducir Token ADMIN o MANAGER)**
    - `POST {{BASE_URL}}/api/appointments`
    - ![Login](/src/img/CrearCita1.jpg)
    - ![Login](/src/img/CrearCita2.jpg)
- ✅ **Actualizar una cita por ID de cita (introducir Token login)**
    - `PUT {{BASE_URL}}/api/appointments/:appointmentId`

- ✅ **Eliminar cita (ADMIN o MANAGER)**
    - `DELETE {{BASE_URL}}/api/appointments/:appointmentId`

- ✅ **Citas de un cliente (introducir Token cliente)**
    - `GET {{BASE_URL}}/api/appointments/client/`

- ✅ **Citas de un artista (introducir Token artista)**
    - `GET {{BASE_URL}}/api/appointments/artist/`

</details>



<details>
<summary>👨‍👨‍👧‍👧 Usuarios 👨‍👨‍👧‍👧</summary>

- ✅ **Ver perfil de usuario (Introducir Token de Login)**
    - `GET {{BASE_URL}}/api/users/profile/profile`
    - ![Perfil](image-1.png)

- ✅ **Actualizar perfil según Token**
    - `PUT {{BASE_URL}}/api/users/profile`

- ✅ **Mostrar todos los artistas**
    - `GET {{BASE_URL}}/api/users/role/artists`

- ✅ **Mostrar todos los usuarios (ADMIN o MANAGER)**
    - `GET {{BASE_URL}}/api/users/`

- ✅ **Crear nuevo usuario (ADMIN)**
    - `POST {{BASE_URL}}/api/users/`

- ✅ **Mostrar usuarios por ID (ADMIN o MANAGER)**
    - `GET {{BASE_URL}}/api/users/:id`

- ✅ **Mostrar usuarios por nombre (ADMIN o MANAGER)**
    - `GET {{BASE_URL}}/api/users/search/:name`

- ✅ **Actualizar usuario por ID (ADMIN)**
    - `PUT {{BASE_URL}}/api/users/:id`

- ✅ **Eliminar usuario (ADMIN)**
    - `DELETE {{BASE_URL}}/api/users/:id`

- ✅ **Mostrar todos los clientes (ADMIN o MANAGER)**
    - `GET {{BASE_URL}}/api/users/role/clients`

</details>

