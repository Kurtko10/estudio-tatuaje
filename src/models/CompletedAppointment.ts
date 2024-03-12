import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { Client } from "./Client";

@Entity("completed_appointments")
export class CompletedAppointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "completed_date" })
    completedDate!: Date;

//-----------

    @ManyToOne(() => Appointment, (appointment) => appointment.completedAppointments)
    @JoinColumn({ name: "appointment_id" }) 
    appointment!: Appointment;

    @ManyToOne(() => Client, (client) => client.completedAppointments)
    @JoinColumn({ name: "client_id" })
    client!: Client;


    


}


