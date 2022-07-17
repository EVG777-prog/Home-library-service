import { Injectable } from '@nestjs/common';
import { ITrack } from 'src/interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  private _tracks: ITrack[] = [];

  create({ name, artistId, albumId, duration }: CreateTrackDto): ITrack {
    const newTrack = new Track({ name, artistId, albumId, duration });
    this._tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this._tracks;
  }

  findTrack(id: string): ITrack {
    return this._tracks.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): ITrack {
    const track = this.findTrack(id);

    track.name = updateTrackDto.name || track.name;
    track.artistId = updateTrackDto.artistId || track.artistId;
    track.albumId = updateTrackDto.albumId || track.albumId;
    track.duration = updateTrackDto.duration || track.duration;

    return track;
  }

  remove(id: string): ITrack {
    const track = this.findTrack(id);
    this._tracks.splice(this._tracks.indexOf(track), 1);
    return track;
  }
}
