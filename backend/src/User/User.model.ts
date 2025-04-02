import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

export class User {
  @ObjectIdColumn()
  private _id: ObjectId;

  @Column()
  private email: string;

  @Column()
  private password: string;

  constructor(email?: string, password?: string) {
    if (email) this.email = email;
    if (password) this.password = password;
  }
  getEmail(): string {
    return this.email;
  }
  getPassword(): string {
    return this.password;
  }
  setEmail(email: string): void {
    this.email = email;
  }
  setPassword(password: string): void {
    this.password = password;
  }
  getId(): ObjectId {
    return this._id;
  }
}
