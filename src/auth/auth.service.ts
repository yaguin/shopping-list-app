import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { signInResponseDto } from './dto/sign-in.dto';
import { ConfigService } from '@nestjs/config';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { User as UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly jwtExpirationTimeInSeconds: number;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(user: UserEntity): Promise<signInResponseDto> {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      expiresIn: this.jwtExpirationTimeInSeconds,
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseDto | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && compareSync(password, user.password)) {
      return this.usersService.mapEntityToDto(user);
    }
    return null;
  }
}
