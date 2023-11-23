import { EnTask } from "src/modules/task/entities/task.entity";
import { EnUser } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EnHistory {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => EnTask, (task) => task.history)
    task: EnTask

    @Column()
    changedDesc:string;

    @Column()
    changedDate:string;
}
