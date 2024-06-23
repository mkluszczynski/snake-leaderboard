import { ApiProperty } from '@nestjs/swagger';
import { UserData } from '../types/userData.type';

export class UserDataDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  public toUserDataType(id: number): UserData {
    return {
      id: id,
      username: this.username,
      password: this.password,
    };
  }
}
