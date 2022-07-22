import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  HttpException,
} from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { v4 } from 'uuid';
import { Track } from 'src/track/entities/track.entity';
import { isUUID } from 'class-validator';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/atrist/artist.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('track/:id')
  createTrack(
    @Param('id') id: string,
    // @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    if (!isUUID(id, 4)) {
      throw new HttpException({}, HttpStatus.BAD_REQUEST);
    }
    const track = this.trackService.findOne(id);
    if (!track) throw new HttpException({}, HttpStatus.UNPROCESSABLE_ENTITY);
    this.favoritesService.create('tracks', id);
    return this.trackService.findOne(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('artist/:id')
  createArtist(
    @Param('id') id: string,
    // @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    if (!isUUID(id, 4)) {
      throw new HttpException({}, HttpStatus.BAD_REQUEST);
    }
    const artist = this.artistService.findOne(id);
    if (!artist) throw new HttpException({}, HttpStatus.UNPROCESSABLE_ENTITY);
    this.favoritesService.create('artists', id);
    return this.artistService.findOne(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('album/:id')
  createAlbum(
    @Param('id') id: string,
    // @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    if (!isUUID(id, 4)) {
      throw new HttpException({}, HttpStatus.BAD_REQUEST);
    }
    const album = this.albumService.findOne(id);
    if (!album) throw new HttpException({}, HttpStatus.UNPROCESSABLE_ENTITY);
    this.favoritesService.create('albums', id);
    return this.albumService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    const favorites = { ...this.favoritesService.findAll() };
    const responseObj = { tracks: [], albums: [], artists: [] };
    favorites.tracks.forEach((trackId) => {
      responseObj.tracks.push(this.trackService.findOne(trackId));
    });

    favorites.albums.forEach((albumId) => {
      responseObj.albums.push(this.albumService.findOne(albumId));
    });

    favorites.artists.forEach((artistId) => {
      responseObj.artists.push(this.artistService.findOne(artistId));
    });

    return responseObj;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoritesService.update(id, updateFavoriteDto);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    this.favoritesService.remove('albums', id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    this.favoritesService.remove('tracks', id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    this.favoritesService.remove('artists', id);
  }
}
