import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserData } from '../user/types/userData.type';
import { tryCatch } from '../../utils/tryCatch';
import { InvalidPasswordError } from './errors/InvalidPassword.error';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async logIn(@Body() userData: UserData) {
    const res = await tryCatch<string, InvalidPasswordError>(
      async () =>
        await this.authService.logIn(userData.name, userData.password),
    );

    if (res.error) throw new HttpException(res.error.message, 400);
    return { apiKey: res.data };
  }
}
