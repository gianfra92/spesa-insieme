import { IsString, IsInt, Min } from 'class-validator';

export class SelectItemDto {
  @IsString()
  userId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
