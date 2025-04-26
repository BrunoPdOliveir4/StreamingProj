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
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from 'src/dto/updateUser.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UserService {
  remove(id: number) {
    throw new Error("Method not implemented.");
  }
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
  async create(data: { email: string; password: string }): Promise<User> {
    const { email, password } = data;

    const existing = await this.userRepository.findOneByEmail(email);
    if (existing) throw new ConflictException('Email already in use');
  
    const user = new User(email);
    const salt = user.getSalt();
    const hashedPassword = bcrypt.hashSync(password, salt);
    user.setPassword(hashedPassword);
    
    const token = this.jwtService.sign(
      { email: email },
      { secret: 'SECRET', expiresIn: '1h' },
    );
    if (!email) throw new BadRequestException('Email is required');
    if (!password) throw new BadRequestException('Password is required');
    this.emailValidation(email);
  
    const url = `http://localhost:3000/auth/verify-email?token=${token}`;

    // Envia o e-mail (com nodemailer)
    await this.sendEmail(user.email, url);

  
    return this.userRepository.create(user);
  }

  async sendEmail(to: string, link: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'seu-email@gmail.com',
        pass: 'sua-senha',
      },
    });

    await transporter.sendMail({
      from: '"App" no-reply.validation@assistircomvoce.com>',
      to,
      subject: 'Confirme seu e-mail',
      html: `<p>Confirme seu e-mail clicando <a href="${link}">aqui</a>.</p>`,
    });
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
