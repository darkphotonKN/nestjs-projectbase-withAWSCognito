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
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

// DTOs for validation
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UsersService } from './users.service';

// Custom Interceptor for Serialization
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/users.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// Custom user interceptor
import { User } from './user.entity';
import { AuthGuard } from 'src/guard/auth.guard';

// Nest approach (!warning! not the best solution, having a quick search online and have found similar thoughts on this
// - and so I implemented custom interceptors (DTOs) for flexibility)
// @UseInterceptors(ClassSerializerInterceptor) // removes password in response if Exclude() decorator was

// using my recommended approach
@Serialize(UserDTO) // can also be applied per request handler method, right now its global for the entire controller
@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/activeUser')
  @ApiBearerAuth('JWT-auth')
  getActiveUser(@ActiveUser() user: ActiveUserData) {
    return user;
  }

  // remember that everything coming from requests are strings - we need to parse them into numbers ourselves
  @Get('/:id')
  @ApiBearerAuth('JWT-auth')
  findUser(@Param('id') id: string) {
    console.log('Finding user...');
    return this.usersService.findOne(parseInt(id));
  }

  @Get('/findAllUsers')
  @ApiBearerAuth('JWT-auth')
  async findAllUsers(@Query('email') email: string) {
    console.log('email:', email);
    console.log('all users:', await this.usersService.find(email));
    return this.usersService.find(email);
  }

  @Delete('/:id')
  @ApiBearerAuth('JWT-auth')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  @ApiBearerAuth('JWT-auth')
  // updates an existing user
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    this.usersService.update(parseInt(id), body);
    return { status: 200, msg: 'User updated!' };
  }
}
