import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class OAuthService {
  constructor(private usersService: UsersService) {}
}
