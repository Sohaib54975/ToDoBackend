import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { error } from 'console';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}


  @Post()
  async CreateRole(@Res() response, @Body() createRoleDto: CreateRoleDto) {
    try {
      const newRole = await this.rolesService.createRole(createRoleDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Role has been created successfully',
        newRole,
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
  async getRoles(@Res() response) {
    try {
      const allRoleData = await this.rolesService.getAllRole();
      return response.status(HttpStatus.OK).json({
        Message: 'All Roles data found successfully',
        allRoleData,
      });
    } catch (error: any) {
      console.log('Error Fetching All the Roles ::::', error.message);
      return response
        .status(error.status)
        .json({ Message: 'Error in Fetching All Roles', error: error });
    }
  }
  
  @Put('/:id')
  async updateRole(
    @Res() response,
    @Param('id') roleId: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    try {
      const updatedRole= await this.rolesService.updateRole(
        roleId,
        updateRoleDto,
      );
      return response.status(HttpStatus.OK).json({
        Message: 'Role has been successfully updated',
        updatedRole,
      });
    } catch (error) {
      return response
        .status(error.status)
        .json(
          { Message: 'Error in Updating this Particular Role' },
          error.response,
        );
    }
  }

  @Get('/:id')
  async getRole(@Res() response, @Param('id') roleId: number) {
    try {
      const fetchedRole = await this.rolesService.getRole(roleId);
      return response.status(HttpStatus.OK).json({
        Message: 'Role found successfully',
        fetchedRole,
      });
    } catch (error) {
      return response
        .status(error.status)
        .json(
          { Message: 'Error in Fetching this Particular Role' },
          error.response,
        );
    }
  }

}
