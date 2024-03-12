import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Appointment } from "./Appointment";

@Entity('artists')
export class Artist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'name', type: 'varchar' })
    name!: string;

    @Column({ name: 'specialty', type: 'varchar' })
    specialty!: string;

    @Column({ name: 'biography', type: 'text', nullable: true })
    biography?: string;

    @Column({ name: 'portfolio', type: 'text', nullable: true })
    portfolio?: string;

    @ManyToOne(() => User, user => user.artists)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @OneToMany(() => Appointment, appointment => appointment.artist)
    appointments?: Appointment[];
}

