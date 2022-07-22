import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 } from 'uuid';

@Injectable()
export class ArtistService {
  private static artists: Array<Artist> = [];

  constructor() {
    ArtistService.artists = [];
  }
  create(createArtistDto: CreateArtistDto) {
    const artist = { ...createArtistDto, id: v4() };
    ArtistService.artists.push(artist);
    return artist;
  }

  findAll() {
    return ArtistService.artists;
  }

  findOne(id: string) {
    return ArtistService.artists.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);
    const updatedArtist = { ...artist, ...updateArtistDto };
    this.remove(id);
    ArtistService.artists = [...ArtistService.artists, updatedArtist];
    return updatedArtist;
  }

  remove(id: string) {
    ArtistService.artists = ArtistService.artists.filter(
      (artist) => artist.id !== id,
    );
  }
}
