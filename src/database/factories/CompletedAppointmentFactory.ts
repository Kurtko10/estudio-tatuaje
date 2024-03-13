import { faker } from "@faker-js/faker";
import { CompletedAppointment } from "../../models/CompletedAppointment";
import { Factory } from "./Factory";

export class CompletedAppointmentFactory extends Factory<CompletedAppointment>{
    protected generate(): CompletedAppointment {
        return{
completedDate: faker.date.past(),
        }as CompletedAppointment
    }
}