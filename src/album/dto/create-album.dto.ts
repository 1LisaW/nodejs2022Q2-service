import { IsInt, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;
  @IsInt()
  year: number;
  @IsString()
  @ValidateIf((_o, value) => value !== null)
  artistId?: string | null; // refers to Artist
}
