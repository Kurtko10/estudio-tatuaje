import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "./Service";
import { Artist } from "./Artist";
import { Client } from "./Client";
import { CompletedAppointment } from "./CompletedAppointment";
import { AppointmentStatus } from "../constants/AppointmentStatus";
@Entity('appointments')
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'datetime', type: 'datetime' })
    datetime!: Date;

    @Column({ name: 'status', length: 20 })
    status!: AppointmentStatus;

    @ManyToOne(() => Service, service => service.apointments)
    @JoinColumn({ name: 'service_id' })
    service!: Service;

    @ManyToOne(() => Artist, artist => artist.appointments)
    @JoinColumn({ name: 'artist_id' }) 
    artist!: Artist;
    
    @ManyToOne(() => Client, client => client.appointments)
    @JoinColumn({ name: 'client_id' }) 
    client!: Client;  
       // relación uno a muchos con las citas completadas
       @OneToMany(() => CompletedAppointment, (completedAppointment) => completedAppointment.appointment)
       completedAppointments?: CompletedAppointment[];
}