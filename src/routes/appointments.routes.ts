import express from "express";
import { appointmentController } from "../controllers/appointmentController";

const router = express.Router();

// Ruta para crear una cita
router.post("/", appointmentController.createAppointment);

// Ruta para actualizar una cita específica
router.put('/:id', appointmentController.updateAppointment);

// Eliminar cita
router.delete("/:id",appointmentController.deleteAppointment);

// Citas de un usuario por client_Id
router.get('/client/:id', appointmentController.getAppointmentsByClientId);

// Citas de un artista
router.get('/artist/:id',appointmentController.getAppointmentsByArtistId);






export default router;
