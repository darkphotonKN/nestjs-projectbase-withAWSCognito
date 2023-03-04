import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  price: string;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  mileage: number;

  // expose only the user id from the entire user object that was
  // in the response object
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
