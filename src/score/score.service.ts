import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
    private readonly userService: UserService,
  ) {}

  public async getScores(take: number = 10, skip: number = 0) {
    return await this.scoreRepository.find({
      take,
      skip,
      order: { value: 'desc' },
    });
  }

  public async getUserScore(user: User) {
    return await this.scoreRepository.findOneBy({ user: user });
  }

  public async saveScore(score: Score) {
    return await this.scoreRepository.save(score);
  }

  public async deleteUserScore(user: User) {
    const score = await this.scoreRepository.findOneBy({ user: user });
    await this.scoreRepository.delete(score);
  }

  public async doUserHaveSavedScore(user: User): Promise<boolean> {
    const score = await this.scoreRepository.findOneBy({ user: user });
    return !!score;
  }
}
