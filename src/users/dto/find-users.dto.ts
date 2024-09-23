import { IsOptional, IsString, IsEmail } from 'class-validator';

export class FindUsersDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
