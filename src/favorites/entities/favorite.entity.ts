import { ApiProperty } from '@nestjs/swagger';

export class Favorite {
  @ApiProperty()
  artists: string[]; // favorite artists ids
  @ApiProperty()
  albums: string[]; // favorite albums ids
  @ApiProperty()
  tracks: string[]; // favorite tracks ids
}
