import { forwardRef, Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './score.entity';
import { ConfigModule } from '../../lib/config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score]),
    ConfigModule,
    forwardRef(() => UserModule),
  ],
  exports: [ScoreService],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
