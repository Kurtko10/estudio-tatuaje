import express from "express";
import { userController } from "../controllers/userController";

const router = express.Router();


// Ruta para obtener todos los usuarios
router.get("/", userController.getAllUsers);
// Obtener usuario por Id
router.get("/:id",userController.getById);

// Obtener todos los artistas
router.get("/role/artists", userController.getByArtistRole);
// Obtener todos los clientes
router.get("/role/clients", userController.getByClientRole);

// Crear usuario
router.post("/", userController.create);

// Actualizar usuario
router.put("/:id",userController.update);

// Eliminar usuario
router.delete("/:id",userController.delete);


router.get("/search/:name", userController.getUserByName);

 



export default router;