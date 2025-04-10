import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './User.entity';
import { UserRepository } from './User.repository';
import { JwtService } from '@nestjs/jwt';
import { token } from 'src/infrastructure/auth/auth.service';
import bcrypt from 'bcrypt';
import { UpdateUserDTO } from 'src/dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async decryptToken(token: string): Promise<token> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException(`Invalid token: ${error}`);
    }
  }

  async getUserByToken(token: string): Promise<User> {
    const decoded: token = await this.decryptToken(token);
    const user: User | null = await this.userRepository.findOneById(decoded.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(email: string, password: string): Promise<User> {
    this.emailValidation(email);

    if (!password) throw new BadRequestException('Password is required');
    if (await this.userRepository.findOneByEmail(email))
      throw new ConflictException('Email already in use');

    const newUser = new User(email);
    const salt = newUser.getSalt();
    const hashedPassword = bcrypt.hashSync(password, salt);
    newUser.setPassword(hashedPassword);

    return this.userRepository.create(newUser);
  }

  async update(id: string, updatedUser: UpdateUserDTO): Promise<User> {
    const userToUpdate = await this.findOne(id);

    if (updatedUser.email) this.emailValidation(updatedUser.email);
    if (updatedUser.password) {
      const salt = userToUpdate.getSalt();
      updatedUser.password = bcrypt.hashSync(updatedUser.password, salt);
    }

    updatedUser.updatedAt = new Date();

    const user: User | null = await this.userRepository.update(id, updatedUser);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private emailValidation(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new BadRequestException('Invalid email');
  }
}
