import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
    isFromMobile: boolean,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user?.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }

    if (
      (isFromMobile && user.role !== Role.COURIER) ||
      (!isFromMobile && user.role === Role.COURIER)
    ) {
      throw new UnauthorizedException('Invalid role');
    }
    const payload = { sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
