import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnTask } from './entities/task.entity';
@Module({
  imports: [TypeOrmModule.forFeature([EnTask])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule { }