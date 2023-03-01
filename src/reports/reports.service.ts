import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Reports } from './reports.entity';

export class ReportsService {
  constructor(@InjectRepository(Reports) private repo: Repository<Reports>) {}

  create(reportDto: CreateReportDto) {
    const report = this.repo.create(reportDto); // create instance

    // save it
    return this.repo.save(report);
  }
}
