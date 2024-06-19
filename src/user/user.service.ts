import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserData } from './types/userData.type';
import { User } from './user.entity';
import { UserNotFound } from './errors/UserNotFound.error';
import { UserAlreadyExistsError } from './errors/UserAlreadyExists.error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getUsers() {
    return await this.userRepository.find();
  }

  public async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new UserNotFound();
    return user;
  }

  public async getUserByName(name: string) {
    const user = await this.userRepository.findOneBy({ name });
    if (!user) throw new UserNotFound();
    return user;
  }

  public async createUser(userData: UserData) {
    if (this.doesUserExist(userData.name)) {
      throw new UserAlreadyExistsError();
    }

    const newUser = this.userRepository.create();

    newUser.name = userData.name;
    newUser.password = userData.password;

    return await this.userRepository.save(newUser);
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

  public async doesUserExist(name: string) {
    const user = await this.userRepository.findOneBy({ name });
    return !!user;
  }
}
