import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register/new')
  registerNewUser(@Body() body: UserDto) {
    return this.usersService.registerNewUser(body);
  }

  @Get('all')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
