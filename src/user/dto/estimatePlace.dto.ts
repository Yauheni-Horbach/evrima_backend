import { IsNotEmpty } from 'class-validator';
import { PlaceItem } from '../../types';

export class EstimatePlaceDto {
  @IsNotEmpty()
  currentTravelId: string;

  @IsNotEmpty()
  placeItem: PlaceItem;

  @IsNotEmpty()
  event: 'like' | 'dislike';
}
