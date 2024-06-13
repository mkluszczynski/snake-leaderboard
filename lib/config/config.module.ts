import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  exports: [ConfigService],
})
export class ConfigModule {}
