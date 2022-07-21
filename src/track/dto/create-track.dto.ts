import { IsString, IsInt } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;
  @IsInt()
  duration: number;
  artistId: null;
  albumId: null;
}
