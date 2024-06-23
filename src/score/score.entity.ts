import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  value: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToOne(() => User, (user) => user.score, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  public static createScoreWithUserObject(scoreValue: number, user: User) {
    const score = new Score();
    score.value = scoreValue;
    score.user = user;
    return score;
  }
}
