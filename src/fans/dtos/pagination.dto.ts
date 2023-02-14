// lists of the different properities that all a create user api should have
import { IsString, IsNumber, IsArray } from 'class-validator'; // provides decorators to validate properties

export class PaginationDTO {
  @IsString()
  search: string;

  @IsArray()
  filter: any[];

  @IsNumber()
  currentPage: number;

  @IsNumber()
  perPageCounts: number;

}
