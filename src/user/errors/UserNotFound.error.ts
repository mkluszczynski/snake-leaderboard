import { HttpException } from '@nestjs/common';

export class UserNotFound extends HttpException {
  constructor() {
    super('User not found', 404);
  }
}
