import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';

@Injectable()
export class UsersService {
  private _users: User[] = [
    {
      id: uuidv4(),
      login: 'John Doe',
      password: '123456',
      version: 0,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    },
  ];

  createUser({ login, password }: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      login: login,
      password: password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    this._users.push(newUser);
    return newUser;
  }

  findUser(id: string): User {
    return this._users.find((user) => user.id === id);
  }

  getUsers(): User[] {
    return this._users;
  }

  removeUser(id: string): User {
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
