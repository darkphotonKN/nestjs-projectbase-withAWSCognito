import { Module } from '@nestjs/common';
import { FansService } from './fans.service';
import { FansController } from './fans.controller';

// Database connection
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fan } from './fan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fan])], // creates the respository for us
  providers: [FansService],
  controllers: [FansController],
})
export class FansModule {}
