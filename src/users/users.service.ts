import { Injectable } from '@nestjs/common';
import { IUser } from 'src/interfaces';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private _users: IUser[] = [];

  createUser({ login, password }: CreateUserDto): IUser {
    const newUser = new User({ login, password });
    this._users.push(newUser);
    return newUser;
  }

  findUser(id: string): IUser {
    return this._users.find((user) => user.id === id);
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
    user.password = updatePasswordDto.newPassword;
    user.version++;
    user.updatedAt = new Date().getTime();
    return user;
  }
}
