import express from "express";
import { userController } from "../controllers/userController";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";


const router = express.Router();


// Ruta para obtener todos los usuarios
router.get("/",auth,authorize(["manager"]), userController.getAllUsers);

// Obtener usuario por Id
router.get("/:id",auth,authorize(["manager"]),userController.getById);

// Obtener usuario por nombre
router.get("/search/:name",auth,authorize(["manager"]), userController.getUserByName);

// Obtener todos los artistas
router.get("/role/artists", userController.getArtist);

// Obtener todos los clientes
router.get("/role/clients",auth, authorize(["manager"]), userController.getByClientRole);

// Ver perfil personal de usuario
router.get("/profile/profile",auth, userController.getProfile);

// Actualizar perfil personal usuario
router.put("/profile", auth,authorize(["user"]), userController.updateProfile);

// Crear usuario
router.post("/",auth,authorize([]), userController.create);

// Actualizar usuario por ID
router.put("/:id",auth,authorize([]),userController.update);

// Eliminar usuario
router.delete("/:id",auth,userController.delete);


export default router;