import express, { Application } from 'express';         // Importa express y la interfaz Application de express
import coors from 'cors';                               // Importa el módulo cors para manejar los encabezados CORS
import { corsOptions } from './config/cors';            // Importa las opciones de configuración CORS desde un archivo separado
import dotenv from "dotenv";                            // Importa el módulo dotenv para cargar variables de entorno desde un archivo .env
import baseRoute from "./routes/base.routes";           // Importa las rutas base de la aplicación


dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app:Application = express(); // Crea una instancia de la aplicación Express y la asigna a la constante app

//------Middleware--------
app.use(express.json()); // Usa el middleware integrado express.json() para analizar el cuerpo de las solicitudes con formato JSON
app.use(coors(corsOptions)); // Usa el middleware cors con las opciones definidas en corsOptions para manejar las solicitudes CORS

//------Base route--------
app.use("/", baseRoute); // Establece la ruta base 

export default app; // Exporta Express para su utilización por otros módulos

