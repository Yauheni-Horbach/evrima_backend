import {
  IsOptional,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsNotEmptyObject,
} from 'class-validator';

export class CreateTravelDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmptyObject()
  readonly coordinates: {
    lat: number;
    lng: number;
  };

  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @IsOptional()
  @IsNumber()
  readonly radius: number;

  @IsOptional()
  @IsString()
  readonly startDate: string;

  @IsOptional()
  @IsString()
  readonly endDate: string;
}

export class CreateTravelDtoResult {
  @IsString()
  readonly currentTravelId: string;

  readonly travelItem: CreateTravelDto & { id: string };
}
