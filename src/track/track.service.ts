import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 } from 'uuid';

@Injectable()
export class TrackService {
  private static tracks: Array<Track> = [];

  constructor() {
    TrackService.tracks = [];
  }

  create(createTrackDto: CreateTrackDto) {
    const track: Track = { ...createTrackDto, id: v4() };
    TrackService.tracks.push(track);
    return track;
  }

  findAll(): Track[] {
    console.dir('tracks', TrackService.tracks);
    return TrackService.tracks;
  }

  findOne(id: string): Track {
    return TrackService.tracks.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    const newTrack = { ...track, ...updateTrackDto };
    this.remove(id);
    TrackService.tracks = [...TrackService.tracks, newTrack];
    return newTrack;
  }

  remove(id: string) {
    TrackService.tracks = TrackService.tracks.filter(
      (track) => track.id !== id,
    );
  }
}
