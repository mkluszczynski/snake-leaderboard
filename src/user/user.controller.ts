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
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { tryCatch } from '../../utils/tryCatch';
import { User } from './user.entity';
import { UserNotFound } from './errors/UserNotFound.error';
import { UserAlreadyExistsError } from './errors/UserAlreadyExists.error';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDataDto } from './dto/userData.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getUsers() {
    const users = await this.userService.getUsers();
    return users.map((user) => user.toUserData());
  }

  @Get('/:id')
  public async getUserById(@Param('id') id: number) {
    const res = await tryCatch<User, UserNotFound>(
      async () => await this.userService.getUserById(id),
    );
    if (res.error) throw new HttpException('User not found', 404);
    return res.data.toUserData();
  }

  @Post()
  @HttpCode(201)
  public async createUser(@Body() userData: UserDataDto) {
    const res = await tryCatch<User, UserNotFound | UserAlreadyExistsError>(
      async () => await this.userService.createUser(userData),
    );

    if (res.error) throw new HttpException(res.error.message, 400);
    return res.data.toUserData();
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async updateUser(
    @Param('id') id: string,
    @Body() userData: UserDataDto,
    @Req() req: any,
  ) {
    if (req.user.id !== +id) throw new HttpException('Unauthorized', 401);
    const res = await tryCatch<User, UserNotFound>(
      async () => await this.userService.updateUser(+id, userData),
    );

    if (res.error) throw new HttpException('Failed to update user', 400);
    return res.data.toUserData();
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async deleteUser(@Param('id') id: string, @Req() req: any) {
    if (req.user.id !== +id) throw new HttpException('Unauthorized', 401);

    const res = await tryCatch<User, Error>(
      async () => await this.userService.getUserById(+id),
    );

    if (res.error) throw new HttpException('User not found', 404);
    await this.userService.deleteUser(+id);
  }
}
