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

// using my recommended approach
// @Serialize(FanItemDTO)
@Controller('fan')
export class FansController {
  constructor(
    private fansService: FansService
    ) {}

  @Post('/createFan')
  // using the nestjs decorator Bouthdy and our custom DTO to makes sure email and password is validated
  createFan(@Body() body: CreateFanDTO) {
    const { modelNo, info, type, seriesNo, name } = body;

    return this.fansService.create(modelNo, info, type, seriesNo, name);
  }

  @Get('/getAllFans')
  // using the nestjs decorator Bouthdy and our custom DTO to makes sure email and password is validated
  getAllFans() {
    return this.fansService.getAllFans();
  }

  @Post('/pagination')
  // using the nestjs decorator Bouthdy and our custom DTO to makes sure email and password is validated
  pagination(@Body() body: PaginationDTO) {
    const { search, filter, currentPage, perPageCounts } = body;

    return this.fansService.pagination(
      search, 
      filter, 
      currentPage, 
      perPageCounts);
  }
}
