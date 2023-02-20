import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Fan } from './fan.entity';
import { CreateFanDTO } from './dtos/create-fan.dto';
import { UpdateFanDTO } from './dtos/update-fan.dto';

interface Filter {
  type: string,
  value: string[]
}

@Injectable()
export class FansService {
  // this tells the DI system that we need the repository - it automatically creates an instance of this entity
  constructor(
    @InjectRepository(Fan)
    private fanRepository: Repository<Fan>
  ) {}

  // finds a fan by id
  async findOne(id: string) {
    const fan = await this.fanRepository.findOne({
      where: { id: id },
    });
    if (!fan) {
      throw new NotFoundException(`Fan #${id} not found`);
    }
    return fan;
  }

  // creates a new fan and stores it in the DB
  async create(createFanDto: CreateFanDTO) {
    const newFan = this.fanRepository.create({ ...createFanDto });
    this.fanRepository.save(newFan);
    return { createdData: newFan };
  }

  async update(id: string, updateFanDto: UpdateFanDTO) {
    // const existingFan = this.findOne(id);
    const fan = await this.fanRepository.update(id, updateFanDto);
    if (!fan) {
      throw new NotFoundException(`Fan #${id} not found`);
    }
    // this.fanRepository.save(fan);
    return { updatedData: updateFanDto };
  }

  async remove(id: string) {
    const fan = await this.findOne(id);
    this.fanRepository.remove(fan);
    return { deletedData: fan };
  }

  async pagination(search: string, filter: Filter[], currentPage: number, limit: number) {
    const take = limit || 10
    const page = currentPage || 1;
    const skip = (page - 1) * take;
    const keyword = search || 'fan'
    const data2 = await this.fanRepository.findAndCount({
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
      totalCount: data2[1],
      data: data2[0],
      currentPage,
    };
  }
}
