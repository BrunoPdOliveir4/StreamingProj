import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './User.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findOneById(id: string): Promise<User | null> {
    return await this.repo.findOne({
      where: { _id: new ObjectId(id) },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.repo.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    return await this.repo.save(user);
  }

  async update(id: string, updatedUser: Partial<User>): Promise<User | null> {
    await this.repo.update(new ObjectId(id), updatedUser);
    return await this.findOneById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(new ObjectId(id));
  }
}
