import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubSectorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sector: string;
}
