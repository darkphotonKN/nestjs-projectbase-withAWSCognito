import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Query,
  Param,
} from '@nestjs/common';

// DTOs for validation

// Custom Interceptor for Serialization
import {
  Serialize,
  SerializeInterceptor,
} from 'src/interceptors/serialize.interceptor';


import { CreateFanDTO } from './dtos/create-fan.dto';
import { PaginationDTO } from './dtos/pagination.dto';
// Nest recommended approach (not the best solution - I implemented custom interceptors (DTOs) for flexibility
// @UseInterceptors(ClassSerializerInterceptor) // removes password in response if Exclude() decorator was
// included in the entity creation

// import { FanDTO } from './dtos/pagination-expose.dto';
import { FansService } from './fans.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsOrderValue } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Fan } from './fan.entity';

import { Pagination } from '../helper/pagination';

const heads = ['type', 'info', 'modelNo', 'seriesNo', 'name'];
// using my recommended approach
// @Serialize(FanItemDTO)
@Controller('fan')
export class FansController {
  Pagination: any;
  constructor(
    private fansService: FansService,
    @InjectRepository(Fan) private repo: Repository<Fan>
    ) {
      this.Pagination = new Pagination(this.repo, "fan", heads);
    }

  @Post('/createFan')
  // using the nestjs decorator Bouthdy and our custom DTO to makes sure email and password is validated
  createFan(@Body() body: CreateFanDTO) {
    const { modelNo, info, type, seriesNo, name } = body;

    return this.fansService.create(modelNo, info, type, seriesNo, name);
  } 
 
  @Post('/fanList')
  getFanList(@Body() body: PaginationDTO) {
    const { search, filter, currentPage, limit, order } = body;
    return this.Pagination.pagination(
      search, 
      filter, 
      currentPage, 
      limit,
      order
    )
  }

  // @Post('/pagination')
  // // using the nestjs decorator Bouthdy and our custom DTO to makes sure email and password is validated
  // pagination(@Body() body: PaginationDTO) {
  //   const { search, filter, currentPage, limit,order } = body;

  //   return this.fansService.pagination(
  //     search, 
  //     filter, 
  //     currentPage, 
  //     limit,
  //     order
  //   );
  // }
}
