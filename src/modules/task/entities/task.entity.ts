import { EnAttachment } from "src/modules/attachments/entities/attachment.entity";
import { EnHistory } from "src/modules/history/entities/history.entity";
import { EnUser } from "src/modules/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, } from "typeorm";

@Entity()
export class EnTask {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => EnUser, (user) => user.tasks)
    user: EnUser

    @OneToMany(() => EnHistory, (history1) => history1.task)
    history: EnHistory[];

    @OneToMany(() => EnAttachment, (attach) => attach.task)
    attachments: EnAttachment[];

    @Column()
    name: string;

    @Column()
    disc: string;

    @Column()
    priority: string;

    // @Column()
    // assignee: string;

    // @Column()
    // creater: string;

    @Column()
    status: string;

    @Column()
    startDate: string;

    @Column()
    dueDate: string;

    @Column()
    tags: string;

    @Column()
    attachment: string;
}