import { Controller, Get, HttpCode, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserData } from './types/userData.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  public getUserById(id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  public createUser(userData: UserData) {
    return this.userService.createUser(userData);
  }

  @Put('/:id')
  public updateUser(id: number, userData: UserData) {
    return this.userService.updateUser(id, userData);
  }
}
