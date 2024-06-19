import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InvalidPasswordError } from './errors/InvalidPassword.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async logIn(userName: string, password: string) {
    const user = await this.userService.getUserByName(userName);

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new InvalidPasswordError();

    return this.jwtService.sign({ id: user.id, name: user.name });
  }
}
