import { EnTask } from "src/modules/task/entities/task.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EnAttachment {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => EnTask, (task) => task.attachments)
    task: EnTask
    
    @Column()
    fileName:string;

    @Column()
    filePath:string;
}
