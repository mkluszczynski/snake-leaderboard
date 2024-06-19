import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserData } from './types/userData.type';
import { tryCatch } from '../../lib/tryCatch';
import { User } from './user.entity';
import { UserNotFound } from './errors/UserNotFound.error';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  public async getUserById(@Param('id') id: number) {
    const res = await tryCatch<User, UserNotFound>(
      async () => await this.userService.getUserById(id),
    );
    if (res.error) throw new HttpException('User not found', 404);
    return res.data;
  }

  @Post()
  @HttpCode(201)
  public async createUser(@Body() userData: UserData) {
    const res = await tryCatch<User, UserNotFound>(
      async () => await this.userService.createUser(userData),
    );

    if (res.error) throw new HttpException('Failed to create user', 400);
    return res.data;
  }

  @Put('/:id')
  public async updateUser(@Param('id') id: number, @Body() userData: UserData) {
    const res = await tryCatch<User, UserNotFound>(
      async () => await this.userService.updateUser(id, userData),
    );

    if (res.error) throw new HttpException('Failed to update user', 400);
    return res.data;
  }

  @Delete('/:id')
  public async deleteUser(@Param('id') id: number) {
    const res = await tryCatch<User, Error>(
      async () => await this.userService.getUserById(id),
    );

    if (res.error) throw new HttpException('User not found', 404);
    await this.userService.deleteUser(id);
  }
}
