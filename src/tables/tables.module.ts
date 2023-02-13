import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';

// Database connection
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Table])], // creates the respository for us
  providers: [TablesService],
  controllers: [TablesController],
})
export class TablesModule {}
