import { HttpException } from '@nestjs/common';

export class UserAlreadyExistsError extends HttpException {
  constructor() {
    super('User already exists', 400);
  }
}
