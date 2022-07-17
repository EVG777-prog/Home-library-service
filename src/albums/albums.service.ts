import { Injectable } from '@nestjs/common';
import { IAlbum } from 'src/interfaces';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private _albums: IAlbum[] = [];

  create(createAlbumDto: CreateAlbumDto): IAlbum {
    const newAlbum = new Album(createAlbumDto);
    this._albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): IAlbum[] {
    return this._albums;
  }

  findAlbum(id: string): IAlbum {
    return this._albums.find((album) => album.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): IAlbum {
    const album = this.findAlbum(id);

    album.name = updateAlbumDto.name ?? album.name;
    album.year = updateAlbumDto.year ?? album.year;
    album.artistId = updateAlbumDto.artistId ?? album.artistId;

    return album;
  }

  remove(id: string): IAlbum {
    const album = this.findAlbum(id);
    this._albums.splice(this._albums.indexOf(album), 1);
    return album;
  }
}
