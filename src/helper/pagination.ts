import { isArray } from 'class-validator';
import { Like, MoreThan, Between } from 'typeorm';

import dayjs from 'dayjs';

export class Pagination {
  repo: any;
  deviceType: string;
  heads: string[];
  // this tells the DI system that we need the repository - it automatically creates an instance of this entity
  constructor(repo: any, deviceType: string, heads: string[]) {
    this.repo = repo;
    this.deviceType = deviceType;
    this.heads = heads;
  }

  // creates a new fan and stores it in the DB
  // create(modelNo: string, info: string, type: string, seriesNo: string, name: string) {

  //   const newFan = this.repo.create({ modelNo, info, type, seriesNo, name });
  //   this.repo.save(newFan);
  //   return { createdData: { modelNo, info, type, seriesNo, name }};
  // }

  // format filter's where condition 
  filterFormat = (filter: any) => {
    let formatData = [];
    filter.forEach((item: any) => {
      const type = typeof item.value;
      if (type === 'string') {
        if (item.type === 'date') {
          console.log('date', dayjs())
          // console.log('date',dayjs(item.value),dayjs(item.value).add(1, 'days'))
          formatData[0] = { ...formatData[0] , systemDate: ''};
        } else {
          formatData[0] = { ...formatData[0] ,[item.type]:item.value};
        }
      } else if (isArray(item.value) && !item.startDate && !item.endDate) {
        const data = item.value.map((value: string) => ({[item.type]:Like(`%${value}%`)}));
        formatData.push(...data);
      } else if (item.startDate && item.endDate) {
        formatData[0] = { ...formatData[0] , systemDate: Between(item.startDate, item.endDate)};
      }
       
    })

    console.log('formatData', formatData)
    return formatData;
  };
  // format keyword's where condition 
  keywordFormat = (keyword: string, heads: string[]) => {
    if(!keyword) return;
    const formatObj = heads.map(item => ({[item]: Like(`%${keyword}%`)}));
    return formatObj;
  }

  async pagination(
    search: string, 
    filter: any[], 
    currentPage: number, 
    limit: number, 
    order: 'ASC' | 'DESC') {
    const take = limit || 10;
    const page = currentPage || 1;
    const skip= (page-1) * take ;
    const keyword = search || 'fan'
    const orderVAlue = order || 'DESC';

    const data = await this.repo
    .createQueryBuilder(this.deviceType)
    .where(this.filterFormat(filter))
    // .andWhere(this.keywordFormat(keyword, this.heads))
    .orderBy({id: orderVAlue})
    .take(take)
    .skip(skip)
    .getManyAndCount();

    return {
      totalCount: data[1], 
      data: data[0],
      currentPage,
    };
  }
}