import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../user/user.service';
import { CreateScoreDto } from './dto/createScore.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Score } from './score.entity';

@Controller('scores')
export class ScoreController {
  constructor(
    private readonly scoreService: ScoreService,
    private readonly userService: UserService,
  ) {}

  @Get()
  public async getScores(
    @Query('take') take: number,
    @Query('skip') skip: number,
  ) {
    return await this.scoreService.getScores(take, skip);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async saveScore(@Req() req: any, @Body() scoreDto: CreateScoreDto) {
    const user = await this.userService.getUserById(req.user.id);

    if (await this.scoreService.doUserHaveSavedScore(user)) {
      await this.scoreService.deleteUserScore(user);
    }
    await this.scoreService.saveScore(
      Score.createScoreWithUserObject(scoreDto.value, user),
    );
    return HttpStatus.CREATED;
  }
}
