import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment";
@Entity('services')
export class Service {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "name", length: 100 })
    name!: string;

    @Column({ name: "description", type: "text" })
    description!: string;

    @Column({ name: "execution_time", type: "int" })
    executionTime!: number;

//Relaciones 1 a muchos

@OneToMany(()=> Appointment, (appointment)=>appointment.service)
apointments?: Appointment[];

}
