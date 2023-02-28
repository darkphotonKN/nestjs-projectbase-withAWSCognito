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
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UsersService } from './users.service';

// Custom Interceptor for Serialization
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/users.dto';
import { AuthService } from './auth.service';
import { SignInUserDTO } from './dtos/signin-user.dto';

// Custom Decorator
import { CurrentUser } from './decorators/current-user.decorator';

// Custom user interceptor
import { User } from './user.entity';
import { AuthGuard } from 'src/guard/auth.guard';

// Nest approach (!warning! not the best solution, having a quick search online and have found similar thoughts on this
// - and so I implemented custom interceptors (DTOs) for flexibility)
// @UseInterceptors(ClassSerializerInterceptor) // removes password in response if Exclude() decorator was

// using my recommended approach
@Serialize(UserDTO) // can also be applied per request handler method, right now its global for the entire controller
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  // using the nestjs decorator Bouthdy and our custom DTO to makes sure email and password is validated
  async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const { name, email, password } = body;

    const user = await this.authService.signUp(name, email, password);

    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signInUser(@Body() body: SignInUserDTO, @Session() session: any) {
    const { email, password } = body;

    const user = await this.authService.signIn(email, password);

    session.userId = user.id;

    console.log('session:', session);

    if (user) {
      console.log('signed in!');
      return JSON.stringify({
        message: 'Credentials authenticated, login was successful.',
      });
    } else {
      return JSON.stringify(user);
    }
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @UseGuards(AuthGuard)
  @Get('/loggedInUser')
  getLoggedInUser(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  // remember that everything coming from requests are strings - we need to parse them into numbers ourselves
  @Get('/user/:id')
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

  @Delete('/user/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/updateUser/:id')
  // updates an existing user
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    this.usersService.update(parseInt(id), body);
    return { status: 200, msg: 'User updated!' };
  }
}
