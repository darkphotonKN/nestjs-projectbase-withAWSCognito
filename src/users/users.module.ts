import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { OAuthService } from './oauth.service';
import { UsersController } from './users.controller';

// Database connection
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // creates the respository for us
  providers: [UsersService, AuthService, OAuthService],
  controllers: [UsersController],
})
export class UsersModule {}
