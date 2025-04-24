import {Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "./User.entity";
import { UserService } from "./User.service";

@Controller("user")
export class UserController {
  private users: User[] = [];
  private idCounter = 1;
  constructor(private readonly userService: UserService) {}

  @Post()
  @Post()
async createUser(
  @Body() body: { email: string; password: string },
): Promise<User> {
  const { email, password } = body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new HttpException("Invalid email format", HttpStatus.BAD_REQUEST);
  }

  return this.userService.create({ email, password }); // passa como DTO
}


  @Get(":id")
  getUserById(@Param("id") id: number) {
    
  }

  @Put(":id")
  async updateUser(){
    
  }

  @Delete(":id")
  deleteUser(@Param("id") id: number) {
    
  }
}
