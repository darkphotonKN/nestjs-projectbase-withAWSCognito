import { Expose } from 'class-transformer';

// expose allows only these 3 properties to pass, exclude the rest
export class PaginationDTO {
  @Expose()
  id: number;

  @Expose()
  modelNo: string;

  @Expose()
  info: string;

  @Expose()
  type: string;

  @Expose()
  seriesNo: string;
}
