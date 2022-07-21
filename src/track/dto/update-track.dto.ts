import { IsInt, IsString } from 'class-validator';
export class UpdateTrackDto {
  @IsString()
  name?: string;
  @IsInt()
  duration?: number;
  artistId?: string | null;
}
