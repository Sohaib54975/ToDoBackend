import { EnUser } from "src/modules/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,  } from "typeorm";
@Entity()

export class EnRole {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => EnUser, (user) => user.roles)
    // user: EnUser

    @OneToMany(() => EnUser, (user) => user.role)
    users: EnUser[]

    @Column()
    roleName: string;

    @Column()
    update: boolean;

    @Column()
    read: boolean;
}
