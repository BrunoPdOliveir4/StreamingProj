import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/User.entity'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/nest_db',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
