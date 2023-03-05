import {
  Body,
  Controller,
  Post,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ApproveReportDTO } from './dtos/ApproveReportDto';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Serialize(ReportDto) // serializes the outgoing response
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  // updating the reports entity with either approved or unapproved
  @Patch('/approve/:id')
  @UseGuards(AuthGuard)
  approveReport(@Param() id: string, @Body() body: ApproveReportDTO) {
    return this.reportsService.approve(id, body.approved);
  }
}
