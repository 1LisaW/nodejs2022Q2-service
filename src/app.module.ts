import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AtristModule } from './atrist/atrist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [UserModule, AtristModule, TrackModule, AlbumModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
