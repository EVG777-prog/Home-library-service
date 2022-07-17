import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class Album {
  @ApiProperty()
  id: string; // uuid v4
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  artistId: string | null; // refers to Artist

  constructor({ name, year, artistId }: Partial<Album>) {
    this.id = uuidv4();
    this.name = name;
    this.year = year;
    this.artistId = artistId || null;
  }
}
