import { IsNotEmpty, IsString } from 'class-validator';

// In NestJS, Data Transfer Objects (DTOs) are used to define the shape of data for various operations, such as creating or updating entities. 

// class-transformer:

// This package is often used in conjunction with class-validator. It provides functionality to transform plain JavaScript or TypeScript objects into instances of classes and vice versa. This can be useful when working with data transformations and validation in Nest.js.

export class CreateTaskDto {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly disc: string;

  @IsString()
  @IsNotEmpty()
  readonly priority: string;

  // @IsString()
  // // @IsNotEmpty()
  // readonly assignee: string;

  // @IsString()
  // // @IsNotEmpty()
  // readonly creater: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @IsString()
  readonly startDate: string;

  @IsString()
  @IsNotEmpty()
  readonly dueDate: string;

  @IsString()
  @IsNotEmpty()
  readonly tags: string;

  @IsString()
  @IsNotEmpty()
  readonly attachment: string;
}
