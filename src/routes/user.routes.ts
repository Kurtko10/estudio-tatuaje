import express from "express";
import { userController } from "../controllers/userController";

const router = express.Router();


// Ruta para obtener todos los usuarios
router.get("/", userController.getAllUsers);
// Obtener usuario por Id
router.get("/:id",userController.getById);

// Obtener usuario por roleId
router.get("/role/:roleId", userController.getByRole);

router.get("/role/role/:roleId", userController.getByClientRole);

// Crear usuario
router.post("/", userController.create);


router.get("/search/:name", userController.getUserByName)

router.get("/:id/appointments", userController.getAppointmentsByClientId);

router.get("/:id", (req, res) => {
    res.send("usuario listado por ID ");
 });
 



export default router;