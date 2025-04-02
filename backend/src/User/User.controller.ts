import {Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Controller("user")
export class UserController {
  private users: User[] = [];
  private idCounter = 1;

  @Post()
  async createUser(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const { name, email, password } = body;

    // Validate email with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new HttpException("Invalid email format", HttpStatus.BAD_REQUEST);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: this.idCounter++,
      name,
      email,
      password: hashedPassword,
    };

    this.users.push(newUser);
    return {
      message: "User created successfully",
      user: { id: newUser.id, name, email },
    };
  }

  @Get()
  getAllUsers() {
    return this.users.map(({ password, ...user }) => user); // Exclude password from response
  }

  @Get(":id")
  getUserById(@Param("id") id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: number,
    @Body() body: { name?: string; email?: string; password?: string },
  ) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        throw new HttpException("Invalid email format", HttpStatus.BAD_REQUEST);
      }
      user.email = body.email;
    }

    if (body.password) {
      user.password = await bcrypt.hash(body.password, 10);
    }

    if (body.name) {
      user.name = body.name;
    }

    return {
      message: "User updated successfully",
      user: { id: user.id, name: user.name, email: user.email },
    };
  }

  @Delete(":id")
  deleteUser(@Param("id") id: number) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    this.users.splice(userIndex, 1);
    return { message: "User deleted successfully" };
  }
}
