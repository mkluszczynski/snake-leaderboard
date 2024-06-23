import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserData } from './types/userData.type';
import { Score } from '../score/score.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToOne(() => Score, (score) => score.user, { cascade: true })
  score: Score;

  public toUserData(): UserData {
    return {
      id: this.id,
      username: this.name,
    };
  }
}
