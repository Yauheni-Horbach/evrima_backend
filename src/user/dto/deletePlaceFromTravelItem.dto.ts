import { IsNotEmpty } from 'class-validator';

export class DeletePlaceFromTravelItemDto {
  @IsNotEmpty()
  currentTravelId: string;

  @IsNotEmpty()
  id: string;
}
