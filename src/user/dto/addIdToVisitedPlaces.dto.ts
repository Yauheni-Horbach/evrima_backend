import { IsNotEmpty } from 'class-validator';

export class AddIdToVisitedPlacesDto {
  @IsNotEmpty()
  currentTravelId: string;

  @IsNotEmpty()
  id: string;
}

export class AddIdToVisitedPlacesDtoResult {
  @IsNotEmpty()
  currentTravelId: string;

  @IsNotEmpty()
  visitedPlaces: string[];
}
