import express from "express";
import { appointmentController } from "../controllers/appointmentController";

const router = express.Router();

// Ruta para crear una cita
router.post("/", appointmentController.createAppointment);

// Ruta para actualizar una cita específica
router.put('/:appointmentId', appointmentController.updateAppointment);

// Citas de un usuario por client_Id
router.get('/:id/appointments', appointmentController.getAppointmentsByClientId);






export default router;
