import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { tryCatch } from '../../utils/tryCatch';
import { InvalidPasswordError } from './errors/InvalidPassword.error';
import { UserCredentialsDto } from './dto/userCredentials.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  public async logIn(@Body() userCredentials: UserCredentialsDto) {
    const res = await tryCatch<string, InvalidPasswordError>(
      async () =>
        await this.authService.logIn(
          userCredentials.username,
          userCredentials.password,
        ),
    );

    if (res.error) throw new HttpException(res.error.message, 400);
    return { apiKey: res.data };
  }
  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async getMe(@Req() req: any) {
    const user = await this.userService.getUserById(req.user.id);
    return user.toUserData();
  }
}
