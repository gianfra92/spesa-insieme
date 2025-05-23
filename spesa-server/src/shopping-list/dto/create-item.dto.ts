import { IsString, IsInt, Min } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
