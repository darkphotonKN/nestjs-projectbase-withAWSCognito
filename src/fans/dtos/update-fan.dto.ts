// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateFanDTO } from './create-fan.dto';

export class UpdateFanDTO extends PartialType(CreateFanDTO) {}
