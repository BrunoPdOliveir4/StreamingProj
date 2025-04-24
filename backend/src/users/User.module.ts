import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './User.service';
import { UserController } from './User.controller';
import { UserRepository } from './User.repository';
import { User } from './User.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/infrastructure/auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION }, 
    }),
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
