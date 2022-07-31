import { IsArray } from 'class-validator';

export class Favorite {
  @IsArray()
  artists?: string[]; // favorite artists ids
  @IsArray()
  albums?: string[]; // favorite albums ids
  @IsArray()
  tracks?: string[]; // favorite tracks ids
}
