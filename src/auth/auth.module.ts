import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../../lib/config/config.service';

const configService = new ConfigService();

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: configService.jwtSecret(),
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}