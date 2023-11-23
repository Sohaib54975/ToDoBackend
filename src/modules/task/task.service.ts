import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnTask as ITask } from './entities/task.entity';
@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(ITask)
    private taskRepository: Repository<ITask>,
  ) { }
  // Create the new Task
  async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
    const newTask = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(newTask);
  }

  //   Get All the Taks 
  async getAllTask(): Promise<ITask[]> {
    const taskData = await this.taskRepository.find();
    if (!taskData || taskData.length == 0) {
      throw new NotFoundException('Task data not found!');
    }
    return taskData;
  }

  //   Get the Task against particular Id
  async getTask(taskId: number): Promise<ITask> {
    const existingTask = await this.taskRepository.findOne({
      where: { id: taskId }, // Assuming the primary key is named 'id'
    });

    if (!existingTask) {
      throw new NotFoundException(`Task #${taskId} not found`);
    }

    return existingTask;
  }

  //   Delete the Task against particular Id
  async deleteTask(taskId: number): Promise<ITask> {
    const existingTask = await this.taskRepository.findOne({
      where: { id: taskId }, // Assuming the primary key is named 'id'
    });

    if (!existingTask) {
      throw new NotFoundException(`Task #${taskId} not found`);
    }

    await this.taskRepository.remove(existingTask);

    return existingTask;
  }


  //   Update the Task against particular Id
  async updateTask(taskId: number, updateTaskDto: UpdateTaskDto): Promise<ITask> {
    const existingTask = await this.taskRepository.findOne({
      where: { id: taskId }, // Assuming the primary key is named 'id'
    });


    if (!existingTask) {
      throw new NotFoundException(`Task #${taskId} not found`);
    }

    // Merge the existing task with the new data
    this.taskRepository.merge(existingTask, updateTaskDto);

    // Save the updated task
    const updatedTask = await this.taskRepository.save(existingTask);

    return updatedTask;
  }

}
