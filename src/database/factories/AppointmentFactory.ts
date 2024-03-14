import { AppointmentStatus } from "../../constants/AppointmentStatus";
import { Appointment } from "../../models/Appointment";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

export class AppointmentFactory extends Factory<Appointment>{
    protected generate(): Appointment {
      return  {

        datetime: faker.date.anytime(),
        status: faker.helpers.arrayElement([
            AppointmentStatus.PENDING,
            AppointmentStatus.IN_PROGRESS,
            AppointmentStatus.COMPLETED
        ])
      }as Appointment
    } 
} 