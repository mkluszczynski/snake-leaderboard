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

  public async createUser(userData: UserData) {
    const newUser = this.userRepository.create();

    newUser.name = userData.name;
    newUser.password = userData.password;

    return await this.userRepository.save(newUser);
  }

  public async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new Error('User not found');
    return user;
  }

  public async getUsers() {
    return await this.userRepository.find();
  }

  public async updateUser(id: number, userData: UserData) {
    const user = await this.getUserById(id);
    user.name = userData.name;
    user.password = userData.password;

    return await this.userRepository.save(user);
  }

  public async deleteUser(id: number) {
    const user = await this.getUserById(id);
    return await this.userRepository.remove(user);
  }
}
