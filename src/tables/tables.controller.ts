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

import { CreateTableItemDTO } from './dtos/create-table-item.dto';
// Nest recommended approach (not the best solution - I implemented custom interceptors (DTOs) for flexibility
// @UseInterceptors(ClassSerializerInterceptor) // removes password in response if Exclude() decorator was
// included in the entity creation

import { TableItemDTO } from './dtos/tables.dto';
import { TablesService } from './tables.service';

// using my recommended approach
@Serialize(TableItemDTO)
@Controller('table')
export class TablesController {
  constructor(
    private tablesService: TablesService
    ) {}

  @Get()
  getAll() {
    return 'hello';
  }
  @Post('/createTabeleItem')
  // using the nestjs decorator Bouthdy and our custom DTO to makes sure email and password is validated
  createTableItem(@Body() body: CreateTableItemDTO) {
    const { modelNo, info, version, type, seriesNo } = body;

    return this.tablesService.create(modelNo, info, version, type, seriesNo);
  }

  // @Get('/findAllUsers')
  // findAllTableItems(@Query('email') id: string) {
  //   console.log('id:', id);
  //   return {id};
  // }

  // @Delete('/user/:id')
  // removeUser(@Param('id') id: string) {
  //   return '';
  // }

}
