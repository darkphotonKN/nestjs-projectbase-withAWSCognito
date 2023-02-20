import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from './table.entity';

@Injectable()
export class TablesService {
  // this tells the DI system that we need the repository - it automatically creates an instance of this entity
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>
  ) {}

  // creates a new user and stores it in the DB
  create(modelNo: string, info: string, version: string, type: string, seriesNo: string) {
    // creating an instance before saving is best practice, allowing hooks
    // to tap into the
    const newUser = this.tableRepository.create({ modelNo, info, version, type, seriesNo });
    this.tableRepository.save(newUser);
  }

}
