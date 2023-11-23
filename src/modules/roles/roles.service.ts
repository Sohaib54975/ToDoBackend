import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EnRole } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(EnRole)
    private roleRepository: Repository<EnRole>,
  ) { }

    // Create the new User
    async createRole(createRoleDto: CreateRoleDto): Promise<EnRole> {
      const newRole = this.roleRepository.create(createRoleDto);
      return this.roleRepository.save(newRole);
    }

  //   Get All the Roles 
  // async getAllRole(): Promise<EnRole[]> {
  //   const roleData = await this.roleRepository.find();
  //   if (!roleData || roleData.length == 0) {
  //     throw new NotFoundException('Role data not found!');
  //   }
  //   return roleData;
  // }

  async getAllRole(): Promise<EnRole[]> {
    const roleData = await this.roleRepository.find();
    if (!roleData || roleData.length === 0) {
      throw new NotFoundException('Role data not found!');
    }
    return roleData;
  }
  //   Get the Role against particular Id
  async getRole(roleId: number): Promise<EnRole> {
    const existingRole = await this.roleRepository.findOne({
      where: { id: roleId }, // Assuming the primary key is named 'id'
    });

    if (!existingRole) {
      throw new NotFoundException(`Role #${roleId} not found`);
    }

    return existingRole;
  }

  //   Update the Role against particular Id
  async updateRole(roleId: number, updateRoleDto: UpdateRoleDto): Promise<EnRole> {
    const existingRole = await this.roleRepository.findOne({
      where: { id: roleId }, // Assuming the primary key is named 'id'
    });


    if (!existingRole) {
      throw new NotFoundException(`Role #${roleId} not found`);
    }

    // Merge the existing role with the new data
    this.roleRepository.merge(existingRole, updateRoleDto);

    // Save the updated role
    const updatedRole = await this.roleRepository.save(existingRole);

    return updatedRole;
  }
}
