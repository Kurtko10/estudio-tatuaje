import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { Service } from "../models/Service";
import { Artist } from "../models/Artist";
import { Client } from "../models/Client";
import { AppointmentStatus } from "../constants/AppointmentStatus";
import { ar, faker } from "@faker-js/faker";
import { User } from "../models/User";
import { Between } from "typeorm";

export const appointmentController = {

// Crear cita
// async createAppointment(req: Request, res: Response): Promise<void> {
//     try {
        
//         const { datetime, service_id, artist_id, client_id } = req.body;

//         if (datetime && isNaN(new Date(datetime).getTime())) {
//             res.status(400).json({ message: "Invalid datetime format" });
//             return;
//         }

//         if (isNaN(service_id) || isNaN(artist_id) || isNaN(client_id)) {
//             res.status(400).json({ message: "Invalid service, artist, or client ID" });
//             return;
//         }

//         const service = await Service.findOne({ where: { id: service_id } });
//         const artist = await Artist.findOne({ where: { id: artist_id } });
//         const client = await Client.findOne({ where: { id: client_id } });

//         if (!service || !artist || !client) {
//             res.status(404).json({ message: "Service, artist, or client not found" });
//             return;
//         }

//         let status = AppointmentStatus.PENDING;
//         const appointmentDate = datetime ? new Date(datetime) : faker.date.future();//Utilizamos faker a modo prueba si no se da una fecha
//         const currentDate = new Date();

//         if (appointmentDate < currentDate) {
//             status = AppointmentStatus.COMPLETED;
//         } else if (appointmentDate.toDateString() === currentDate.toDateString()) {
//             status = AppointmentStatus.IN_PROGRESS;
//         }

//         const appointment = Appointment.create({
//             datetime: appointmentDate,
//             status,
//             service: service_id,
//             artist: artist_id,
//             client: client_id
//         });

//         await appointment.save(); 

//         console.log("Code 201: Appointment created successfully");
//         res.status(201).json({
//             message: "Appointment created successfully",
//             appointment
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// },

// async createAppointment(req: Request, res: Response): Promise<void> {
//     try {
//         // Extraer datos de la solicitud
//         const { datetime, service_id, artist_id, client_id } = req.body;

//         // Validar el formato de la fecha y hora de la cita
//         if (!datetime || isNaN(new Date(datetime).getTime())) {
//             res.status(400).json({ message: "Invalid datetime format" });
//             return;
//         }

//         // Convertir la fecha de la cita a un objeto Date
//         const appointmentDate = new Date(datetime);

//         // Verificar si la hora de la cita está dentro del rango permitido (10:00 - 17:59)
//         const appointmentHour = appointmentDate.getHours();
//         if (appointmentHour < 10 || appointmentHour >= 18) {
//             res.status(400).json({ message: "Appointment time must be between 10:00 and 17:59" });
//             return;
//         }

//         // Validar la existencia y el formato de los IDs de servicio, artista y cliente
//         if (isNaN(service_id) || isNaN(artist_id) || isNaN(client_id)) {
//             res.status(400).json({ message: "Invalid service, artist, or client ID" });
//             return;
//         }

//         // Buscar el servicio, el artista y el cliente en la base de datos
//         const service = await Service.findOne({ where: { id: service_id } });
//         const artist = await Artist.findOne({ where: { id: artist_id } });
//         const client = await Client.findOne({ where: { id: client_id } });

//         // Verificar si el servicio, el artista y el cliente existen
//         if (!service || !artist || !client) {
//             res.status(404).json({ message: "Service, artist, or client not found" });
//             return;
//         }

//         // Buscar todas las citas existentes del artista
//         const existingAppointments = await Appointment.find({
//             where: {
//                 artist: artist_id,
//             },
//         });

//         // Verificar si hay superposición con las citas existentes
//         for (const existingAppointment of existingAppointments) {
//             const existingAppointmentDate = new Date(existingAppointment.datetime);
//             const existingAppointmentEnd = new Date(existingAppointmentDate);
//             existingAppointmentEnd.setHours(existingAppointmentEnd.getHours() + 2.5); // Consideramos una cita de 2 horas
//             if (appointmentDate >= existingAppointmentDate && appointmentDate < existingAppointmentEnd) {
//                 res.status(400).json({ message: "Artist already has an appointment in the same hour or the following two hours" });
//                 return;
//             }
//         }

//         // Establecer el estado de la cita en función de la fecha y hora actual y de la cita
//         let status = AppointmentStatus.PENDING;
//         const currentDate = new Date();

//         if (appointmentDate < currentDate) {
//             status = AppointmentStatus.COMPLETED;
//         } else if (appointmentDate.toDateString() === currentDate.toDateString()) {
//             status = AppointmentStatus.IN_PROGRESS;
//         }

//         // Crear la cita con los datos proporcionados
//         const appointment = Appointment.create({
//             datetime: appointmentDate,
//             status,
//             service: service_id,
//             artist: artist_id,
//             client: client_id
//         });

//         // Guardar la cita en la base de datos
//         await appointment.save(); 

//         // Enviar respuesta con el código 201 y los datos de la cita
//         console.log("Code 201: Appointment created successfully");
//         res.status(201).json({
//             message: "Appointment created successfully",
//             appointment
//         });
//     } catch (error) {
//         // Manejar errores internos del servidor
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }

async createAppointment(req: Request, res: Response): Promise<void> {
    try {
        // Extraer datos de la solicitud
        const { datetime, service_id, artist_id, client_id } = req.body;

        // Validar el formato de la fecha y hora de la cita
        if (!datetime || isNaN(new Date(datetime).getTime())) {
            res.status(400).json({ message: "Invalid datetime format" });
            return;
        }

        // Convertir la fecha de la cita a un objeto Date
        const appointmentDate = new Date(datetime);

        // Verificar si la hora de la cita está dentro del rango permitido (10:00 - 17:59)
        const appointmentHour = appointmentDate.getHours();
        if (appointmentHour < 10 || appointmentHour >= 18) {
            res.status(400).json({ message: "Appointment time must be between 10:00 and 17:59" });
            return;
        }

        // Validar la existencia y el formato de los IDs de servicio, artista y cliente
        if (isNaN(service_id) || isNaN(artist_id) || isNaN(client_id)) {
            res.status(400).json({ message: "Invalid service, artist, or client ID" });
            return;
        }

        // Buscar el servicio, el artista y el cliente en la base de datos
        const service = await Service.findOne({ where: { id: service_id } });
        const artist = await Artist.findOne({ where: { id: artist_id } });
        const client = await Client.findOne({ where: { id: client_id } });

        // Verificar si el servicio, el artista y el cliente existen
        if (!service || !artist || !client) {
            res.status(404).json({ message: "Service, artist, or client not found" });
            return;
        }

        // Obtener la duración del servicio
        let appointmentDuration = 1.9833; // Por defecto, 2 horas
        if (service_id === 2) {
            appointmentDuration = 1.9833; // Para el servicio con id 2, 3 horas
        } else if (service_id === 3) {
            appointmentDuration = 0.9833; // Para el servicio con id 3, 1 hora
        } else if (service_id === 4) {
            appointmentDuration = 2.9833; // Para el servicio con id 4, 3 horas
        }

        // Buscar todas las citas existentes del artista y del cliente
        const existingAppointments = await Appointment.find({
            where: [
                { artist: artist_id },
                { client: client_id }
            ]
        });

        // Verificar si hay superposición con las citas existentes
        for (const existingAppointment of existingAppointments) {
            const existingAppointmentDate = new Date(existingAppointment.datetime);
            const existingAppointmentEnd = new Date(existingAppointmentDate);
            existingAppointmentEnd.setHours(existingAppointmentEnd.getHours() + appointmentDuration); // Consideramos la duración del servicio
            if (appointmentDate >= existingAppointmentDate && appointmentDate < existingAppointmentEnd) {
                res.status(400).json({ message: "Artist or client already has an appointment in the same hour or the following hours" });
                return;
            }
        }

        // Establecer el estado de la cita en función de la fecha y hora actual y de la cita
        let status = AppointmentStatus.PENDING;
        const currentDate = new Date();

        if (appointmentDate < currentDate) {
            status = AppointmentStatus.COMPLETED;
        } else if (appointmentDate.toDateString() === currentDate.toDateString()) {
            status = AppointmentStatus.IN_PROGRESS;
        }

        // Crear la cita con los datos proporcionados
        const appointment = Appointment.create({
            datetime: appointmentDate,
            status,
            service: service_id,
            artist: artist_id,
            client: client_id
        });

        // Guardar la cita en la base de datos
        await appointment.save(); 

        // Enviar respuesta con el código 201 y los datos de la cita
        console.log("Code 201: Appointment created successfully");
        res.status(201).json({
            message: "Appointment created successfully",
            appointment
        });
    } catch (error) {
        // Manejar errores internos del servidor
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
},


 // Actualizar cita por Id de cita
async updateAppointment(req: Request, res: Response): Promise<void> {
    try {
        const appointmentId = Number(req.params.id);
        const { datetime, status, service, artist } = req.body;

        const appointment = await Appointment.findOne({ 
            where: { id: appointmentId },
            relations: ["client"] 
        });

        if (!appointment) {
            res.status(404).json({ message: "Appointment not found" });
            return;
        }

        let newDatetime = appointment.datetime;
        if (datetime) {
            newDatetime = new Date(datetime);
            if (isNaN(newDatetime.getTime())) {
                res.status(400).json({ message: "Invalid datetime format" });
                return;
            }
        }

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


async getAppointmentsByClientId(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.tokenData.userId;

        const user = await User.findOne({where:{id:userId}});

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const client = await Client.findOne({ where: { user: user } });

        if (!client) {
            res.status(404).json({ message: "Client not found" });
            return;
        }

        const appointments = await Appointment.find({
            where: { client: client },
            relations: ["service", "artist"]
        });

        if (!appointments || appointments.length === 0) {
            res.status(404).json({ message: "No appointments found for this client" });
            return;
        }

        const formattedAppointments = appointments.map(appointment => ({
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

        res.json(formattedAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
},


 // Eliminar cita
 async deleteAppointment(req: Request, res: Response): Promise<void> {
    try {
      const appointmentId = Number(req.params.id);

      const deleteResult = await Appointment.delete(appointmentId);

      if (deleteResult.affected === 0) {
        res.status(404).json({ message: "Cita no encontrada" });
        return;
      }

      res.status(200).json({ message: `Cita con id ${appointmentId} eliminada` });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar" });
    }
  },

// Citas de artista

async  getAppointmentsByArtistId(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.tokenData.userId;

        const user = await User.findOne({where:{id:userId}});

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const artist = await Artist.findOne({ where: { user: user } });

        if (!artist) {
            res.status(404).json({ message: "Artist not found for this user" });
            return;
        }

        const appointments = await Appointment.find({
            relations: ["service", "client"],
            where: {
                artist: artist,
            },
        });

        const formattedAppointments = appointments.map(appointment => ({
            id: appointment.id,
            datetime: appointment.datetime,
            service: { // Datos del servicio
                id: appointment.service.id,
                name: appointment.service.name,
            },
            client: {   // Datos del cliente
                id: appointment.client.id,
                lastName: appointment.client.lastName,
            },
        }));
    
        res.json(formattedAppointments).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
},
async getAllAppointments(req: Request, res: Response): Promise<void> {
    try {
        const appointments = await Appointment.find({
            relations: ["service", "artist", "client"]
        });

        if (!appointments || appointments.length === 0) {
            res.status(404).json({ message: "No appointments found" });
            return;
        }

        const formattedAppointments = appointments.map(appointment => ({
            id: appointment.id,
            datetime: appointment.datetime,
            service: {
                id: appointment.service.id,
                name: appointment.service.name,
            },
            artist: {
                id: appointment.artist.id,
                name: appointment.artist.name,
            },
            client: {
                id: appointment.client.id,
                lastName: appointment.client.lastName,
            },
        }));

        res.json(formattedAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}




};


