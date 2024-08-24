import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'The name of ad', example: 'bag' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @ApiProperty({
    description: 'The description of ad',
    example: 'Beautiful bag',
  })
  readonly description: string;

  @IsArray()
  @ArrayMaxSize(3)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Photos',
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    isArray: true,
    type: String,
  })
  readonly photos: string[];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Price', example: 200 })
  readonly price: number;
}
