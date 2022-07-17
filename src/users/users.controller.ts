import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @ApiResponse({
    type: [User],
  })
  async getUsers(): Promise<CreateUserDto[]> {
    return this.usersService.getUsers();
  }

  @Get('/:id')
  @ApiResponse({
    type: User,
  })
  async getUser(@Param('id') id: string): Promise<CreateUserDto> {
    return this.usersService.findUser(id);
  }

  @Delete(':id') // обработает DELETE
  @ApiResponse({
    type: User,
  })
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }

  @Post('/')
  @ApiResponse({
    type: User,
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiResponse({
    type: User,
  })
  async updatePasswordUser(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return this.usersService.updatePasswordUser(id, updatePasswordDto);
  }
}
