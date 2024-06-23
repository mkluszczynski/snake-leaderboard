import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { tryCatch } from '../../utils/tryCatch';
import { InvalidPasswordError } from './errors/InvalidPassword.error';
import { UserCredentialsDto } from './dto/userCredentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
