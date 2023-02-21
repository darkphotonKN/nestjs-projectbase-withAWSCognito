import { ActiveUserData } from './../iam/interfaces/active-user.decorator';
import { ActiveUser } from './../iam/decorators/active-user-decorator';
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Query,
  Param,
  Session,
} from '@nestjs/common';

// DTOs for validation
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UsersService } from './users.service';

// Custom Interceptor for Serialization
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/users.dto';

// Nest approach (!warning! not the best solution, having a quick search online and have found similar thoughts on this
// - and so I implemented custom interceptors (DTOs) for flexibility)
// @UseInterceptors(ClassSerializerInterceptor) // removes password in response if Exclude() decorator was

// using my recommended approach
@Serialize(UserDTO) // can also be applied per request handler method, right now its global for the entire controller
@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/activeUser')
  getActiveUser(@ActiveUser() user: ActiveUserData) {
    return user;
  }

  // remember that everything coming from requests are strings - we need to parse them into numbers ourselves
  @Get('/:id')
  findUser(@Param('id') id: string) {
    console.log('Finding user...');
    return this.usersService.findOne(parseInt(id));
  }

  @Get('/findAllUsers')
  async findAllUsers(@Query('email') email: string) {
    console.log('email:', email);
    console.log('all users:', await this.usersService.find(email));
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  // updates an existing user
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    this.usersService.update(parseInt(id), body);
    return { status: 200, msg: 'User updated!' };
  }
}
