import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { PlaceItem, TravelItem } from '../../types';

export class UpdateTravelItemDto {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  name: string;

  @IsOptional()
  coordinates: {
    lat: number;
    lng: number;
  };

  @IsOptional()
  location: string;

  @IsOptional()
  radius: number;

  @IsOptional()
  likeList: PlaceItem[];

  @IsOptional()
  dislikeList: string[];

  @IsOptional()
  nextPageLink: string;

  @IsOptional()
  startDate: string;

  @IsOptional()
  endDate: string;

  @IsOptional()
  currentCoordinates: {
    lat: number;
    lng: number;
  };

  @IsOptional()
  visitedPlaces: string[];
}

export class UpdateTravelItemDtoResult {
  @IsString()
  readonly currentTravelId: string;

  readonly travelItem: TravelItem;
}
