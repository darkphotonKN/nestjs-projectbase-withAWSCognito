import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Like, FindOptionsOrderValue } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Fan } from './fan.entity';

interface Filter {
  type: string,
  value: string[],
  startDate?: string,
  endDate?: string,
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

  // async pagination(
  //   search: string, 
  //   filter: Filter[], 
  //   currentPage: number, 
  //   limit: number, 
  //   order: 'ASC' | 'DESC'
  //   ) {
  //   const take = limit || 10;
  //   const page = currentPage || 1;
  //   const skip= (page-1) * take ;
  //   const keyword = search || 'fan'
  //   const orderVAlue = order || 'DESC';

  //   const filterFormat = (filter: any) => {

  //     return {info: "fan info4"}
  //   };

  //   const keywordFormat = keyword && [
  //     {info: Like(`%${keyword}%`)}, 
  //     {type: Like(`%${keyword}%`)}, 
  //     {name: Like(`%${keyword}%`)}, 
  //     {modelNo: Like(`%${keyword}%`)}, 
  //     {seriesNo: Like(`%${keyword}%`)}
  //   ];

  //   const data = await this.repo
  //   .createQueryBuilder("fan")
  //   .where(filterFormat(filter))
  //   .andWhere(keywordFormat)
  //   .orderBy({id: orderVAlue})
  //   .take(take)
  //   .skip(skip)
  //   .getManyAndCount();

  //   return {
  //     totalCount: data[1], 
  //     data: data[0],
  //     currentPage,
  //   };
  // }
}
