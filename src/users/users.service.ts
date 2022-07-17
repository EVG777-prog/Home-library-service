import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { IUser } from 'src/interfaces';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';
import { User } from './entities/user.entity';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class UsersService {
  private _users: IUser[] = [];

  createUser({ login, password }: CreateUserDto): IUser {
    if (!login || !password) {
      throw new HttpException(
        'Login or password is empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = new User({ login, password });
    this._users.push(newUser);
    return newUser;
  }

  findUser(id: string): IUser {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    }

    const user = this._users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  getUsers(): IUser[] {
    return this._users;
  }

  removeUser(id: string): IUser {
    const user = this.findUser(id);
    this._users.splice(this._users.indexOf(user), 1);
    return user;
  }

  updatePasswordUser(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.findUser(id);

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Password wrong', HttpStatus.FORBIDDEN);
    }
    user.password = updatePasswordDto.newPassword;
    user.version++;
    user.updatedAt = new Date().getTime();
    return user;
  }
}
