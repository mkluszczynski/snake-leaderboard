import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserData } from './types/userData.type';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  public toUserData(): UserData {
    return {
      id: this.id,
      username: this.name,
    };
  }
}
