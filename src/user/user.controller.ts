import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDataDto } from './dto/userData.dto';
import { ScoreService } from '../score/score.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly scoreService: ScoreService,
  ) {}

  @Get()
  public async getUsers() {
    const users = await this.userService.getUsers();
    return users.map((user) => user.toUserData());
  }

  @Get('/:id')
  public async getUserById(@Param('id') id: number) {
    const user = await this.userService.getUserById(id);
    return user.toUserData();
  }

  @Post()
  @HttpCode(201)
  public async createUser(@Body() userData: UserDataDto) {
    const res = await this.userService.createUser(userData);
    return res.toUserData();
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async updateUser(
    @Param('id') id: string,
    @Body() userData: UserDataDto,
    @Req() req: any,
  ) {
    if (req.user.id !== +id)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    const user = await this.userService.updateUser(+id, userData);

    return user.toUserData();
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async deleteUser(@Param('id') id: string, @Req() req: any) {
    if (req.user.id !== +id) throw new HttpException('Unauthorized', 401);

    const user = await this.userService.getUserById(+id);

    await this.userService.deleteUser(user.id);
  }

  @Get('/:id/score')
  public async getUserScore(@Param('id') id: number) {
    const user = await this.userService.getUserById(id);
    return await this.scoreService.getUserScore(user);
  }
}
