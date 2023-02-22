import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// expose allows only these 3 properties to pass, exclude the rest

export class CreateFanDTO {
  @ApiProperty({ description: 'The model number of the fan' })
  @IsString()
  modelNo: string;

  @ApiProperty({ description: 'The info of the fan' })
  @IsString()
  info: string;

  @ApiProperty({ description: 'The type of the fan' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'The series number of the fan' })
  @IsString()
  seriesNo: string;

  @ApiProperty({ description: 'The name of the fan' })
  @IsString()
  name: string;

}
