import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { Service } from "../models/Service";
import { Artist } from "../models/Artist";
import { Client } from "../models/Client";
import { AppointmentStatus } from "../constants/AppointmentStatus";
import { faker } from "@faker-js/faker";

export const appointmentController = {

// Crear cita
async createAppointment(req: Request, res: Response): Promise<void> {
    try {
        const { datetime, service_id, artist_id, client_id } = req.body;

        if (datetime && isNaN(new Date(datetime).getTime())) {
            res.status(400).json({ message: "Invalid datetime format" });
            return;
        }

        if (isNaN(service_id) || isNaN(artist_id) || isNaN(client_id)) {
            res.status(400).json({ message: "Invalid service, artist, or client ID" });
            return;
        }

        const service = await Service.findOne({ where: { id: service_id } });
        const artist = await Artist.findOne({ where: { id: artist_id } });
        const client = await Client.findOne({ where: { id: client_id } });

        if (!service || !artist || !client) {
            res.status(404).json({ message: "Service, artist, or client not found" });
            return;
        }

        let status = AppointmentStatus.PENDING;
        const appointmentDate = datetime ? new Date(datetime) : faker.date.future();
        const currentDate = new Date();

        if (appointmentDate < currentDate) {
            status = AppointmentStatus.COMPLETED;
        } else if (appointmentDate.toDateString() === currentDate.toDateString()) {
            status = AppointmentStatus.IN_PROGRESS;
        }

        const appointment = Appointment.create({
            datetime: appointmentDate,
            status,
            service: service_id,
            artist: artist_id,
            client: client_id
        });

        await appointment.save(); 

        console.log("Code 201: Appointment created successfully");
        res.status(201).json({
            message: "Appointment created successfully",
            appointment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
},

    
// Actualizar cita por Id de cita
async updateAppointment(req: Request, res: Response): Promise<void> {
    try {
        const appointmentId = Number(req.params.appointmentId);
        const { datetime, status, service, artist } = req.body;

        const appointment = await Appointment.findOne({ 
            where: { id: appointmentId },
            relations: ["client"] 
        });

        if (!appointment) {
            res.status(404).json({ message: "Appointment not found" });
            return;
        }

        // Mantener la fecha actual si no se proporciona una nueva fecha
        let newDatetime = appointment.datetime;
        if (datetime) {
            newDatetime = new Date(datetime);
            if (isNaN(newDatetime.getTime())) {
                res.status(400).json({ message: "Invalid datetime format" });
                return;
            }
        }

        // Función para determinar el nuevo estado de la cita automáticamente
        const getNewStatus = (): AppointmentStatus => {
            const currentDate = new Date();
            if (newDatetime < currentDate) {
                return AppointmentStatus.COMPLETED;
            } else if (newDatetime.toDateString() === currentDate.toDateString()) {
                return AppointmentStatus.IN_PROGRESS;
            } else if (newDatetime > currentDate) {
                return AppointmentStatus.PENDING;
            } else {
                return appointment.status; 
            }
        };

        const newStatus = getNewStatus();

        // Aplicar cambios
        appointment.datetime = newDatetime || datetime;
        appointment.status = newStatus;
        appointment.service = service || appointment.service;
        appointment.artist = artist || appointment.artist;

        await appointment.save(); 

        console.log("Code 200: Appointment updated successfully");
        res.status(200).json({
            message: "Appointment updated successfully",
            id: appointment.id,
            datetime: appointment.datetime,
            status: appointment.status,
            service: appointment.service,
            artist: appointment.artist,
            client: appointment.client.id 
        });
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
},


// Citas del usuario por ID

async getAppointmentsByClientId(req: Request, res: Response): Promise<void> {
    try {
        const clientId: number = Number(req.params.id);

        const client = await Client.findOne({
            relations: ["appointments", "appointments.service", "appointments.artist"], 
            select: ["id", "lastName"], 
            where:{
                id:clientId,
            },
        });

        if (!client) {
            res.status(404).json({ message: "Client not found" });
            return;
        }

        // Obtiene las citas asociadas al cliente
        const appointments = client!.appointments.map(appointment => ({
            id: appointment.id,
            datetime: appointment.datetime,

            service: { // Datos del servicio
                id: appointment.service.id,
                name: appointment.service.name, 
            },
            artist: {   // datos del artista
                id: appointment.artist.id,
                name: appointment.artist.name, 
            },
        }));

        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
},




};


