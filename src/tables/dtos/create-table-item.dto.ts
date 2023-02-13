// lists of the different properities that all a create user api should have
import { IsString } from 'class-validator'; // provides decorators to validate properties

export class CreateTableItemDTO {
  @IsString()
  modelNo: string;

  @IsString()
  info: string;

  @IsString()
  version: string;

  @IsString()
  type: string;

  @IsString()
  seriesNo: string;
}
