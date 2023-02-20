import { PartialType } from '@nestjs/mapped-types';
import { CreateFanDTO } from './create-fan.dto';

export class UpdateFanDTO extends PartialType(CreateFanDTO) {}
