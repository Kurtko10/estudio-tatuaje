import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role  } from "./Role";
import { Artist } from "./Artist";
import { Client } from "./Client";
@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: "name"})
    name!: string;

    @Column({ name: "password", select: false })
    password!: string;

    @Column({ name: "first_name" })
    firstName!: string;

    @Column({ name: "last_name" })
    lastName!: string;

    @Column({ name: "phone" })
    phone!: string;

    @CreateDateColumn({ name: "registration_date" })
    registrationDate!: Date;

    @Column({ name: "email" })
    email!: string;

    @Column({ name: "is_active" })
    isActive!: boolean;


    //---------------
    @ManyToOne( () =>Role, (role) => role.users)
    @JoinColumn({name:'role_id'})
    role!:Role;

//-----------
@OneToMany(() => Artist, artist => artist.user)
artists?: Artist[];

@OneToMany(() => Client, (client) => client.user)
clients?: Client[];

}
