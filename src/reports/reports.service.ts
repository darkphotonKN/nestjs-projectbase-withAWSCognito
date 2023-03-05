import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Reports } from './reports.entity';

export class ReportsService {
  constructor(@InjectRepository(Reports) private repo: Repository<Reports>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto); // create instance
    report.user = user; // create association
    // save instance
    return this.repo.save(report);
  }

  approve(id: string, approved: boolean) {}
}
