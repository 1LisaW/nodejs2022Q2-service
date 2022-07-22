import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  HttpException,
  Put,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistService as ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto as UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    try {
      const artist = this.artistService.create(createArtistDto);
      return artist;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(): Artist[] {
    try {
      return this.artistService.findAll();
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id, 4)) {
      throw new HttpException({}, HttpStatus.BAD_REQUEST);
    }
    try {
      const artist = this.artistService.findOne(id);
      if (!artist) throw new HttpException({}, HttpStatus.NOT_FOUND);
      return artist;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateArtistDto) {
    this.findOne(id);
    try {
      return this.artistService.update(id, updateTrackDto);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.findOne(id);
    try {
      this.artistService.remove(id);
      this.trackService.cascadeRemove('artistId', id);
      this.albumService.cascadeRemoveArtist(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
