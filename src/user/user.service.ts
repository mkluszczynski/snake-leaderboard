import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserData } from './types/userData.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public createUser(userData: UserData) {
    const newUser = this.userRepository.create();

    newUser.name = userData.name;
    newUser.password = userData.password;

    this.userRepository.save(newUser);
  }
}
