import { IsUUID, IsString, IsBoolean } from 'class-validator';

export class Artist {
  @IsUUID()
  @IsString()
  id: string; // uuid v4
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}
