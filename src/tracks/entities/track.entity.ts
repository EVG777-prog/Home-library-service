import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class Track {
  @ApiProperty()
  id: string; // uuid v4
  @ApiProperty()
  name: string;
  @ApiProperty()
  artistId: string | null; // refers to Artist
  @ApiProperty()
  albumId: string | null; // refers to Album
  @ApiProperty()
  duration: number; // integer number

  constructor({ name, artistId, albumId, duration }: Partial<Track>) {
    this.id = uuidv4();
    this.name = name;
    this.artistId = artistId || null;
    this.albumId = albumId || null;
    this.duration = duration;
  }
}
