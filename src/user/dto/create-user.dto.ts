import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login!: string;
  @IsString()
  // @Exclude()
  password!: string;
}
