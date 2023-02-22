import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

/**
 * Allows all routes passing through to automatically have the
 * currentUser object in the request when using the custom decorator
 * @CurrentUser()
 */
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    // if the userId is present
    if (userId) {
      // grab the actual user object from DB
      const user = await this.usersService.findOne(userId);
      console.log('found user in interceptor:', user);
      // and attach it to the request before further handling
      request.currentUser = user;
    }

    // continue to run the default route handler
    return handler.handle();
  }
}
