import express from "express";
import userRoutes from "./user.routes"
import appointmentsRoutes from "./appointments.routes";
import authRoutes from "./auth.routes";

const router = express.Router();

// API routes
router.use("/users", userRoutes);

router.use("/appointments", appointmentsRoutes);
router.use("/auth", authRoutes);
export default router;