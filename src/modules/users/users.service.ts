import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EnUser } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(EnUser)
    private userRepository: Repository<EnUser>,
  ) { }

  // Create the new User
  async createUser(createUserDto: CreateUserDto): Promise<EnUser> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  //   Get All the User 
  async getAllUser(): Promise<EnUser[]> {
    const userData = await this.userRepository.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('User data not found!');
    }
    return userData;
  }

  //   Get the User against particular Id
  async getUser(userId: number): Promise<EnUser> {
    const existingUser = await this.userRepository.findOne({
      where: { id: userId }, // Assuming the primary key is named 'id'
    });

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return existingUser;
  }

  //   Delete the User against particular Id
  async deleteUser(userId: number): Promise<EnUser> {
    const existingUser = await this.userRepository.findOne({
      where: { id: userId }, // Assuming the primary key is named 'id'
    });

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    await this.userRepository.remove(existingUser);

    return existingUser;
  }


  //   Update the User against particular Id
  async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<EnUser> {
    const existingUser = await this.userRepository.findOne({
      where: { id: userId }, // Assuming the primary key is named 'id'
    });


    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    // Merge the existing User with the new data
    this.userRepository.merge(existingUser, updateUserDto);

    // Save the updated User
    const updatedUser = await this.userRepository.save(existingUser);

    return updatedUser;
  }
}
