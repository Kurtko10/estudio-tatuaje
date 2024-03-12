import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
//import { Client } from "./Client";
//import { Artist } from "./Artist";
import { Service } from "./Service";
import { Artist } from "./Artist";
import { CompletedAppointment } from "./CompletedAppointment";

@Entity('appointments')
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'datetime', type: 'datetime' })
    datetime!: Date;

    @Column({ name: 'status', length: 20 })
    status!: string;

    @ManyToOne(() => Service, service => service.apointments)
    @JoinColumn({ name: 'service_id' })
    service!: Service;

    @ManyToOne(() => Artist, artist => artist.appointments)
    artist!: Artist;

       // relación uno a muchos con las citas completadas
       @OneToMany(() => CompletedAppointment, (completedAppointment) => completedAppointment.appointment)
       completedAppointments?: CompletedAppointment[];
}