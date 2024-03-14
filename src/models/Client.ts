import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { CompletedAppointment } from "./CompletedAppointment";
import { Appointment } from "./Appointment";

@Entity("clients")
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "lastName", length: 50 }) 
    lastName!: string;

    @Column({ name: "provincia", length: 100 })
    provincia!: string;

//-------------

    @ManyToOne(() => User, (user) => user.clients)
    @JoinColumn({ name: 'user_id' })
    user!: User;

       // Definimos la relación uno a muchos con Appointment
       @OneToMany(() => Appointment, appointment => appointment.client)
       appointments!: Appointment[];

        // relación uno a muchos con las citas completadas
        @OneToMany(() => CompletedAppointment, (completedAppointment) => completedAppointment.client)
        completedAppointments?: CompletedAppointment[];
}


