import express, { Request, Response } from "express"; // Importa express y las interfaces Request y Response de express

const router = express.Router();    // Crea un enrutador de Express

// Base router
router.get("/", (req: Request, res: Response) => {      // Maneja las solicitudes GET a la ruta base "/"
    res.send("Welcome");              // Envía la respuesta "Welcome" al cliente
});

export default router;  // Exporta el enrutador para que pueda ser utilizado por otros módulos
