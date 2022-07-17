import { Injectable } from '@nestjs/common';
import { IArtist } from 'src/interfaces';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  private _artists: IArtist[] = [];

  create(createArtistDto: CreateArtistDto): IArtist {
    const newArtist = new Artist(createArtistDto);
    this._artists.push(newArtist);
    return newArtist;
  }

  findAll(): IArtist[] {
    return this._artists;
  }

  findArtist(id: string): IArtist {
    return this._artists.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): IArtist {
    const artist = this.findArtist(id);

    artist.name = updateArtistDto.name || artist.name;
    artist.grammy = updateArtistDto.grammy ?? artist.grammy;

    return artist;
  }

  remove(id: string): IArtist {
    const artist = this.findArtist(id);
    this._artists.splice(this._artists.indexOf(artist), 1);
    return artist;
  }
}
