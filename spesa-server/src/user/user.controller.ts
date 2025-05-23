import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post()
  addUser(@Body() dto: CreateUserDto) {
    return this.service.addUser(dto.name);
  }

  @Delete()
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser(id);
  }
}
