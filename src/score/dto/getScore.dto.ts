import { UserData } from '../../user/types/userData.type';
import { ApiProperty } from '@nestjs/swagger';

export class GetScoreDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  user: UserData;

  @ApiProperty()
  value: number;
}
