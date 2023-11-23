import { EnRole } from "src/modules/roles/entities/role.entity";
import { EnTask } from "src/modules/task/entities/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class EnUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    userRole: string

    @OneToMany(() => EnTask, (task) => task.user)
    tasks: EnTask[]

    //     @OneToMany (() => EnRole, (role) => role.user)
    //     roles: EnRole[] 

    @ManyToOne(() => EnRole, (role) => role.users)
    role: EnRole
}
