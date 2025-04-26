import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Query,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "./User.entity";
import { UserService } from "./User.service";
import { UserRepository } from "./User.repository";
import { JwtService } from "@nestjs/jwt";
import { UpdateUserDTO } from "src/dto/updateUser.dto";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  @Post()
  async createUser(
    @Body() body: { email: string; password: string },
  ): Promise<User> {
    const { email, password } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException("Invalid email format");
    }

    return this.userService.create({ email, password });
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    try {
      const payload = this.jwtService.verify(token, { secret: 'SECRET' });
      const user = await this.userRepository.findOneByEmail(payload.email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.setIsVerified(true);
      await this.userRepository.save(user); // Changed from create to save for updating

      return { message: 'Email verified successfully!' };
    } catch (err) {
      throw new BadRequestException('Invalid or expired token');
    }
  }

  @Get(":id")
  async getUserById(@Param("id") id: number): Promise<User> {
    const user = await this.userService.findOne(id.toString());
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: number,
    @Body() updateData: UpdateUserDTO
  ): Promise<User> {
    try {
      return await this.userService.update(id.toString(), updateData);
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number): Promise<{ message: string }> {
    await this.userService.remove(id);
    return { message: 'User deleted successfully' };
  }
}