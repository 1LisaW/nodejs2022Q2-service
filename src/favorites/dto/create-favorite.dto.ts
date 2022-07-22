import { IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  artists?: string; // favorite artists ids
  @IsString()
  albums?: string; // favorite albums ids
  @IsString()
  tracks?: string; // favorite tracks ids
}
