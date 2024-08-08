import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAdsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  readonly description: string;

  @IsArray()
  @ArrayMaxSize(3)
  @IsNotEmpty()
  readonly photos: string[];

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  readonly price: number;
}
