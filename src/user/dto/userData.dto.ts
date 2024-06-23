import { ApiProperty } from '@nestjs/swagger';

export class UserDataDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
