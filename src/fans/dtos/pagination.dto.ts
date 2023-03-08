// lists of the different properities that all a create user api should have
import { IsString, IsNumber, IsArray } from 'class-validator'; // provides decorators to validate properties

import { FindOptionsOrderValue } from 'typeorm';
export class PaginationDTO {
  @IsString()
  search: string;

  @IsArray()
  filter: any[];

  @IsNumber()
  currentPage: number;

  @IsNumber()
  limit: number;
  
  @IsString()
  order: 'ASC' | 'DESC';

}
