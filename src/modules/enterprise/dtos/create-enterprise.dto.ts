import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEnterpriseDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
