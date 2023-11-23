import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

// @nestjs/mapped-types 
// is a package in the Nest.js ecosystem that provides utility functions
//  and mapped types to simplify common scenarios when working with TypeScript in Nest.js applications. 
//  It is particularly useful for creating modified versions of existing types or DTOs (Data Transfer Objects).

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
