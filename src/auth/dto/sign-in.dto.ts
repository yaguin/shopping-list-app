import { IsEmail, IsString } from 'class-validator';

export class signInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class signInResponseDto {
  access_token: string;
  expiresIn: number;
}
