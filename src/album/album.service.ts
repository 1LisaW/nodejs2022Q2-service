import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  private static albums: Array<Album> = [];

  constructor() {
    AlbumService.albums = [];
  }
  create(createAlbumDto: CreateAlbumDto) {
    const album: Album = { ...createAlbumDto, id: v4() };
    AlbumService.albums.push(album);
    return album;
  }

  findAll() {
    return AlbumService.albums;
  }

  findOne(id: string) {
    return AlbumService.albums.find((album) => album.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    const newAlbum = { ...album, ...updateAlbumDto };
    this.remove(id);
    AlbumService.albums = [...AlbumService.albums, newAlbum];
    return newAlbum;
  }

  remove(id: string) {
    AlbumService.albums = AlbumService.albums.filter(
      (album) => album.id !== id,
    );
  }

  cascadeRemoveArtist(id: string) {
    AlbumService.albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });
  }
}
