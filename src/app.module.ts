import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../lib/config/config.service';

const configService = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...configService.dbConfig(),
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
