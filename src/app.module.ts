import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../lib/config/config.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '../lib/config/config.module';

const configService = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...configService.dbConfig(),
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
