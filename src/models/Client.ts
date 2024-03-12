import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { CompletedAppointment } from "./CompletedAppointment";

@Entity("clients")
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "provincia", length: 100 })
    provincia!: string;

//-------------

    @ManyToOne(() => User, (user) => user.clients)
    @JoinColumn({ name: 'user_id' })
    user!: User;

        // relación uno a muchos con las citas completadas
        @OneToMany(() => CompletedAppointment, (completedAppointment) => completedAppointment.client)
        completedAppointments?: CompletedAppointment[];
}


