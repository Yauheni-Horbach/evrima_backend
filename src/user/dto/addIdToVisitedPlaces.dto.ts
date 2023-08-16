import { IsNotEmpty } from 'class-validator';

export class AddIdToVisitedPlacesDto {
  @IsNotEmpty()
  currentTravelId: string;

  @IsNotEmpty()
  id: string;
}
