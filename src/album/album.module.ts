import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, TrackService, FavoritesService],
})
export class AlbumModule {}
