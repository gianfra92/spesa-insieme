import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.shema';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.service.getAll();
  }

  @Post()
  async addUser(@Body() dto: CreateUserDto): Promise<User> {
    return await this.service.addUser(dto.name);
  }

  @Delete()
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser(id);
  }
}
