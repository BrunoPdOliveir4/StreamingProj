import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

@Entity()
export class User {
  @ObjectIdColumn()
  public _id: ObjectId;

  @Column({ unique: true })
  public email: string;

  @Column()
  private password: string;

  @Column()
  private createdAt: Date;

  @Column()
  private updatedAt: Date;

  @Column()
  private salt: string;

  constructor(email?: string) {
    if (email) this.email = email;
    this.salt = this.generateSalt();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  private generateSalt(): string {
    return bcrypt.genSaltSync(10);
  }

  getId(): string {
    return this._id.toHexString(); 
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getSalt(): string {
    return this.salt;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }
}
