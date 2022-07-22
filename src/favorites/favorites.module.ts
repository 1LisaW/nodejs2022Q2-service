import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/atrist/artist.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, TrackService, AlbumService, ArtistService],
})
export class FavoritesModule {}
