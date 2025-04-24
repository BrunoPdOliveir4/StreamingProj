import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/User.entity';
import { UserService } from 'src/users/User.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const isPasswordValid = await bcrypt.compare(pass, user.getPassword());
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { sub: user.getId(), email: user.getEmail() };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  
  async decryptToken(token: string): Promise<token> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token' + error);
    }
  }

  async getUserByToken(token: string): Promise<User> {
    const decoded: token = await this.decryptToken(token);
    const user = await this.usersService.findOne(decoded.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}

export type token = {
  id: string;
  email: string;
};
