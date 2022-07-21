import { Exclude } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';
export class User {
  @IsString()
  @IsUUID()
  id: string; // uuid v4
  @IsString()
  login: string;
  @IsString()
  @Exclude()
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
