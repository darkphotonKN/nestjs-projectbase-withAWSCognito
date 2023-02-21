import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../iam/authentication/auth.service';
import { UsersController } from './users.controller';

// Database connection
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // creates the respository for us
  providers: [UsersService, AuthService],
  controllers: [UsersController],
})
export class UsersModule {}
