import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
  Res,
  ValidationPipe,
  HttpException,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { ApiOkResponse } from '@nestjs/swagger';
import { isUUID } from 'class-validator';
import { FavoritesService } from 'src/favorites/favorites.service';

console.log('####### in controller module');
@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto) {
    try {
      const track = this.trackService.create(createTrackDto);
      return track;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The track records',
    type: Track,
    isArray: true,
  })
  @Get()
  getAll(): Track[] {
    try {
      return this.trackService.findAll();
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

    const track = this.trackService.findOne(id);
    if (!track) throw new HttpException({}, HttpStatus.NOT_FOUND);
    return track;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    this.findOne(id);
    try {
      return this.trackService.update(id, updateTrackDto);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.findOne(id);
    try {
      this.trackService.remove(id);
      this.favoritesService.cascadeRemove('tracks', id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
