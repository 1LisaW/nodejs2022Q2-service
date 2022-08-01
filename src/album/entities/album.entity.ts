import { IsInt, IsString, IsUUID, ValidateIf } from 'class-validator';

export class Album {
  @IsUUID()
  @IsString()
  id: string; // uuid v4
  @IsString()
  name: string;
  @IsInt()
  year: number;
  @IsString()
  @ValidateIf((_o, value) => value !== null)
  artistId?: string | null; // refers to Artist
}
