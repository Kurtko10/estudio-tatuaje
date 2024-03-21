import express, { Application } from 'express';         
import coors from 'cors';                               
import { corsOptions } from './config/cors';           
import dotenv from "dotenv";                            
import baseRoute from "./routes/base.routes";           
import apiRoutes from './routes/api.routes';
import { handleNotFound } from './middlewares/errorHandler';


dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app:Application = express(); // Crea una instancia de la aplicación Express y la asigna a la constante app

//------Middleware--------
app.use(express.json()); // Usa el middleware integrado express.json() para analizar el cuerpo de las solicitudes con formato JSON
app.use(coors(corsOptions)); // Usa el middleware cors con las opciones definidas en corsOptions para manejar las solicitudes CORS

//------Base route--------
app.use("/", baseRoute); // Establece la ruta base 

//Registrer API routes
app.use("/api", apiRoutes);

app.use(handleNotFound);



export default app; // Exporta Express para su utilización por otros módulos

