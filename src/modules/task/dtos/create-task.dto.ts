import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  memberIds?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  subSectorIds?: string[];
}
