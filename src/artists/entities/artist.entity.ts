import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class Artist {
  @ApiProperty()
  id: string; // uuid v4
  @ApiProperty()
  name: string;
  @ApiProperty()
  grammy: boolean;

  constructor({ name, grammy }: Partial<Artist>) {
    this.id = uuidv4();
    this.name = name;
    this.grammy = grammy;
  }
}
