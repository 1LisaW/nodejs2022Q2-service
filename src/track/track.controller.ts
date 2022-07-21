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

console.log('####### in controller module');
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

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
    console.log('!!!!! in getAll controller');
    try {
      return this.trackService.findAll();
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id, isUUID(id, 4));
    if (!isUUID(id, 4)) {
      console.log('im here');
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
      return this.trackService.remove(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
