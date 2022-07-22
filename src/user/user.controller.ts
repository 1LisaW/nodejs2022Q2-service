import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ParseUUIDPipe,
  HttpException,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { isUUID } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return new User(await this.userService.create(createUserDto));
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    try {
      return await this.userService.findAll();
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    if (!isUUID(id, 4)) {
      throw new HttpException({}, HttpStatus.BAD_REQUEST);
    }
    try {
      const user = await this.userService.findOne(id);
      if (!user) throw new HttpException({}, HttpStatus.NOT_FOUND);
      return user;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.findOne(id);
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException();
    }
    try {
      return new User(await this.userService.update(id, updateUserDto));
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.findOne(id);
    try {
      return await this.userService.remove(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
