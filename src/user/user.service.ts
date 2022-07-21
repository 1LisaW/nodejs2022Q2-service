import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  private static users: Array<User> = [];

  constructor() {
    UserService.users = [];
  }

  async create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      id: v4(),
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    UserService.users.push(user);
    return user;
  }

  async findAll() {
    return UserService.users;
  }

  async findOne(id: string) {
    return UserService.users.find((user) => user.id === id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    await this.remove(id);
    user.password = updateUserDto.newPassword;
    user.version += 1;
    user.updatedAt = new Date().getTime();
    UserService.users = [...UserService.users, user];
    return user;
  }

  async remove(id: string) {
    UserService.users = UserService.users.filter((user) => user.id !== id);
  }
}
