import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
