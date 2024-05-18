import express from "express";
import { appointmentController } from "../controllers/appointmentController";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

const router = express.Router();

// Ruta para crear una cita
router.post("/",auth, appointmentController.createAppointment);

// Ruta para actualizar una cita específica
router.put('/:id',auth,authorize(["manager", "user"]), appointmentController.updateAppointment);

// Eliminar cita
router.delete("/:id",auth,appointmentController.deleteAppointment);

// Citas de un usuario por client_Id
router.get('/client/',auth, appointmentController.getAppointmentsByClientId);

// Citas de un artista
router.get('/artist/',auth,authorize(["manager"]),appointmentController.getAppointmentsByArtistId);

// Citas totales
router.get('/',auth,authorize([]), appointmentController.getAllAppointments);




export default router;
