import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserData } from './types/userData.type';
import { User } from './user.entity';
import { UserNotFound } from './errors/UserNotFound.error';
import { UserAlreadyExistsError } from './errors/UserAlreadyExists.error';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../../lib/config/config.service';
import { UserDataDto } from './dto/userData.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
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

  public async createUser(userData: UserData | UserDataDto) {
    if (await this.doesUserExist(userData.username)) {
      throw new UserAlreadyExistsError();
    }

    const newUser = this.userRepository.create();

    const hashedPassword = await bcrypt.hash(
      userData.password,
      this.configService.salt(),
    );

    newUser.name = userData.username;
    newUser.password = hashedPassword;

    return await this.userRepository.save(newUser);
  }

  public async updateUser(id: number, userData: UserData | UserDataDto) {
    const user = await this.getUserById(id);
    user.name = userData.username;
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
