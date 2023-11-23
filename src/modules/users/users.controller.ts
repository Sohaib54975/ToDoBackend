 import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async CreateUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser,
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json(
        {
          statusCode: 400,
          message: 'Error: User not created!',
          error: 'Bad Request',
        },
        response.error,
      );
    }
  }

  @Get()
  async getUsers(@Res() response) {
    try {
      const allUserData = await this.usersService.getAllUser();
      return response.status(HttpStatus.OK).json({
        message: 'All Users data found successfully',
        allUserData,
      });
    } catch (error) {
      return response
        .status(error.status)
        .json({ Mesage: 'Error in Fetching All Users' }, error.response);
    }
  }

  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const updatedUser = await this.usersService.updateUser(
        userId,
        updateUserDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        updatedUser,
      });
    } catch (error) {
      return response
        .status(error.status)
        .json(
          { Mesage: 'Error in Updating this Particular User' },
          error.response,
        );
    }
  }

  @Get('/:id')
  async getUser(@Res() response, @Param('id') userId: number) {
    try {
      const fetchedUser = await this.usersService.getUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        fetchedUser,
      });
    } catch (error) {
      return response
        .status(error.status)
        .json(
          { Mesage: 'Error in Fetching this Particular User' },
          error.response,
        );
    }
  }

  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') userId: number) {
    try {
      const deletedUser = await this.usersService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User Deleted successfully',
        deletedUser,
      });
    } catch (error) {
      return response
        .status(error.status)
        .json({ Mesage: 'Error in Deleting this User' }, error.response);
    }
  }
}
