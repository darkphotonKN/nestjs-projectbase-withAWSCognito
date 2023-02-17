import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  // data is the first argument passed in when using this decorator
  // so we set this type as "never" - this enforces users to not pass args
  // ExecutionContext is a wrapper around a current request
  (data: never, context: ExecutionContext) => {
    // gets current underlying request
    const request = context.switchToHttp().getRequest();
    console.log('session userId:', request.session.userId);
    return 'custom decorator';
  },
);
