import {Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "./User.entity";

@Controller("user")
export class UserController {
  private users: User[] = [];
  private idCounter = 1;

  @Post()
  async createUser(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const { email, password } = body;

    // Validate email with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new HttpException("Invalid email format", HttpStatus.BAD_REQUEST);
    }

    const newUser: User = new User(email);

    newUser.setPassword(await bcrypt.hash(password, newUser.getSalt()));
    this.users.push(newUser);
    return {
      message: "User created successfully"
    };
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
