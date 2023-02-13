// lists of the different properities that all a create user api should have
import { IsEmail, IsString } from 'class-validator'; // provides decorators to validate properties

export class SignInUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
