import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Fan } from './fan.entity';

interface Filter {
  type: string,
  value: string[]
}

@Injectable()
export class FansService {
  // this tells the DI system that we need the repository - it automatically creates an instance of this entity
  constructor(@InjectRepository(Fan) private repo: Repository<Fan>) {}

  // creates a new fan and stores it in the DB
  create(modelNo: string, info: string, type: string, seriesNo: string, name: string) {

    const newFan = this.repo.create({ modelNo, info, type, seriesNo, name });
    this.repo.save(newFan);
    return { createdData: { modelNo, info, type, seriesNo, name }};
  }

  async pagination(search: string, filter: Filter[], currentPage: number, limit: number) {
    const take = limit || 10
    const page = currentPage || 1;
    const skip= (page-1) * take ;
    const keyword = search || 'fan'
    const data2 = await this.repo.findAndCount({
      where: { 
        // modelNo: Like(`%${keyword}%`),
        // seriesNo: Like(`%${keyword}%`),
        // info: Like(`%${keyword}%`), 
        // type: Like(`%${keyword}%`),
        name: Like(`%${keyword}%`)
      },
      order: { name: "DESC" },
      take: take, // limit count per page
      skip: skip // skip data earlier than currentPage
  })
    return {
      totalCount:data2[1], 
      data: data2[0],
      currentPage,
    };
  }
}
