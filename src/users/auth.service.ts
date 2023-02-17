import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt); // to use promises istead of functions

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(name: string, email: string, password: string) {
    // check if email is already used
    const checkUser = await this.usersService.find(email);

    // check length as a false response returns a emtpy array
    if (checkUser.length) {
      throw new BadRequestException('Email already in use');
    }

    // generate salt
    const salt = randomBytes(8).toString('hex'); // 16 character salt

    // generate hash
    const hash = (await scrypt(password, salt, 32)) as Buffer; // to type it appropriately for TS

    const saltHashPass = `${salt}.${hash.toString('hex')}`;

    // create new user and save it
    const user = this.usersService.create(name, email, saltHashPass);

    // return user
    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    console.log('result:', user);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // using salt to hash incoming password before matching
    const [salt, storedPass] = user.password.split('.');

    const encryptedIncPass = (
      (await scrypt(password, salt, 32)) as Buffer
    ).toString('hex');

    if (encryptedIncPass === storedPass) {
      return user;
    } else {
      throw new UnauthorizedException('Credentials were incorrect');
    }
  }
}
