
import { Seeder } from "./Seeder";
import { Appointment } from "../../models/Appointment";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { SeederConfig } from "../../config/seeders";
import { Artist } from "../../models/Artist";
import { Client } from "../../models/Client";
import { Service } from "../../models/Service";
import { AppointmentStatus } from "../../constants/AppointmentStatus";
import { getRandomValueFromArray } from "../../helpers/common";

export class AppointmentSeeder extends Seeder {

    protected async generate(): Promise<void> {
        const { APPOINTMENT } = SeederConfig;

        const artists = await Artist.find();
        const clients = await Client.find();
        const services = await Service.find();

        const appointmentFactory = new AppointmentFactory();
        const appointments = appointmentFactory.createMany(APPOINTMENT);

        const currentDate = new Date(); // Obtener la fecha actual

        appointments.forEach(appointment => {
            appointment.artist = getRandomValueFromArray(artists);
            appointment.client = getRandomValueFromArray(clients);
            appointment.service = getRandomValueFromArray(services);

            // Comparar la fecha de la cita con la fecha actual
            if (appointment.datetime < currentDate) {
                appointment.status = AppointmentStatus.COMPLETED; 
            } else if (appointment.datetime.toDateString() === currentDate.toDateString()) {
                appointment.status = AppointmentStatus.IN_PROGRESS; 
            } else {
                appointment.status = AppointmentStatus.PENDING;
            }
        });

        await Appointment.save(appointments);
    }
}

