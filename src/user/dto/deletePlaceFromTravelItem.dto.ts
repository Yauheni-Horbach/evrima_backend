import { IsNotEmpty } from 'class-validator';
import { TravelItem } from '../../types';

export class DeletePlaceFromTravelItemDtoResult {
  @IsNotEmpty()
  readonly currentTravelId: string;

  @IsNotEmpty()
  readonly travelItem: TravelItem;
}
