import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Fan } from './fan.entity';

@Injectable()
export class FansService {
  // this tells the DI system that we need the repository - it automatically creates an instance of this entity
  constructor(@InjectRepository(Fan) private repo: Repository<Fan>) {}

  // creates a new fan and stores it in the DB
  create(modelNo: string, info: string, type: string, seriesNo: string, name: string) {

    const newFan = this.repo.create({ modelNo, info, type, seriesNo, name });
    this.repo.save(newFan);
    return { status: "success", createData: { modelNo, info, type, seriesNo, name }};
  }
  
  getAllFans() {
    return this.repo.find(); // returns array of all results
  }

  async pagination(search: string, filter: any[], currentPage: number, perPageCounts: number) {
    const fans = await this.repo.find()
    return {
      total:fans.length, 
      data: fans
    };
  }
}
