import { Injectable } from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  private static favorites: Favorite = {};

  constructor() {
    FavoritesService.favorites = { artists: [], albums: [], tracks: [] };
  }

  create(key: string, id: string) {
    FavoritesService.favorites[key].push(id);
    return id;
  }

  findAll() {
    return FavoritesService.favorites;
  }

  findOne(id: string) {
    return `This action returns a #${id} favorite`;
  }

  update(id: string, updateFavoriteDto: UpdateFavoriteDto) {
    return id;
  }

  remove(key: string, id: string) {
    FavoritesService.favorites[key] = FavoritesService.favorites[key].filter(
      (item) => item !== id,
    );
  }

  cascadeRemove(attrName: string, id: string) {
    FavoritesService.favorites[attrName] = FavoritesService.favorites[
      attrName
    ].filter((index) => index !== id);
  }
}
