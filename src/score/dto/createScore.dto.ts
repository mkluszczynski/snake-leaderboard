import { ApiProperty } from '@nestjs/swagger';

export class CreateScoreDto {
  @ApiProperty()
  value: number;
}
