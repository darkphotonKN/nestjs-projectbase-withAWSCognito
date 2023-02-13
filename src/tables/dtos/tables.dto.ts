import { Expose } from 'class-transformer';

// expose allows only these 3 properties to pass, exclude the rest
export class TableItemDTO {
  @Expose()
  id: number;

  @Expose()
  modelNo: string;

  @Expose()
  info: string;

  @Expose()
  version: string;

  @Expose()
  type: string;

  @Expose()
  seriesNo: string;
}
