import { IsString } from 'class-validator';

// expose allows only these 3 properties to pass, exclude the rest

export class CreateFanDTO {
  @IsString()
  modelNo: string;

  @IsString()
  info: string;

  @IsString()
  type: string;

  @IsString()
  seriesNo: string;

  @IsString()
  name: string;

}
