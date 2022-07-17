import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class User {
  @ApiProperty({ description: 'User identifier' })
  id: string; // uuid v4
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;
  @ApiProperty({
    type: 'integer',
  })
  version: number; // integer number, increments on update
  @ApiProperty()
  createdAt: number; // timestamp of creation
  @ApiProperty()
  updatedAt: number; // timestamp of last update

  constructor({ login, password }: Partial<User>) {
    this.id = uuidv4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = new Date().getTime();
    this.updatedAt = new Date().getTime();
  }
}
