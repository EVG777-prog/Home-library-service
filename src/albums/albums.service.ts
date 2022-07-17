import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAlbum } from 'src/interfaces';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { validate as uuidValidate } from 'uuid';

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
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid album id', HttpStatus.BAD_REQUEST);
    }

    const album = this._albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return album;
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
