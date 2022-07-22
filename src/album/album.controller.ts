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
import { TrackService } from 'src/track/track.service';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    try {
      const album = this.albumService.create(createAlbumDto);
      return album;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(): Album[] {
    try {
      return this.albumService.findAll();
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
      const artist = this.albumService.findOne(id);
      if (!artist) throw new HttpException({}, HttpStatus.NOT_FOUND);
      return artist;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    this.findOne(id);
    try {
      return this.albumService.update(id, updateAlbumDto);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.findOne(id);
    try {
      this.trackService.cascadeRemove('albumId', id);
      this.albumService.remove(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
