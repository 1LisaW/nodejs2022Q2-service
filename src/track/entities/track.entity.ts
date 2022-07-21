import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { IsUUID } from 'class-validator';

export class Track {
  @IsUUID()
  id!: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
