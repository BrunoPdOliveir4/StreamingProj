import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/User.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule, 
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'Programar com você!', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard], 
})
export class AuthModule {}
