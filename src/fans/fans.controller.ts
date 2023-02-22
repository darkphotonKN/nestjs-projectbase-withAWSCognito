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
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

// DTOs for validation

// Custom Interceptor for Serialization
import {
  Serialize,
  SerializeInterceptor,
} from 'src/interceptors/serialize.interceptor';


import { CreateFanDTO } from './dtos/create-fan.dto';
import { PaginationDTO } from './dtos/pagination.dto';
import { UpdateFanDTO } from './dtos/update-fan.dto';
// Nest recommended approach (not the best solution - I implemented custom interceptors (DTOs) for flexibility
// @UseInterceptors(ClassSerializerInterceptor) // removes password in response if Exclude() decorator was
// included in the entity creation

// import { FanDTO } from './dtos/pagination-expose.dto';
import { FansService } from './fans.service';

// using my recommended approach
// @Serialize(FanItemDTO)
@ApiTags('Fans')
@Controller('fan')
export class FansController {
  constructor(
    private fansService: FansService
  ) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  @ApiBearerAuth('JWT-auth')
  findAll() {
    return this.fansService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  findOne(@Param('id') id: string) {
    return this.fansService.findOne(id);
  }

  @Post('/createFan')
  @ApiBearerAuth('JWT-auth')
  createFan(@Body() createFanDTO: CreateFanDTO) {
    return this.fansService.create(createFanDTO);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  update(@Param('id') id: string, @Body() updateFanDTO: UpdateFanDTO) {
    return this.fansService.update(id, updateFanDTO);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  remove(@Param('id') id: string) {
    return this.fansService.remove(id);
  }

  @Post('/pagination')
  @ApiBearerAuth('JWT-auth')
  // using the nestjs decorator Body and our custom DTO to makes sure email and password is validated
  pagination(@Body() body: PaginationDTO) {
    const { search, filter, currentPage, perPageCounts } = body;

    return this.fansService.pagination(
      search,
      filter,
      currentPage,
      perPageCounts);
  }
}
