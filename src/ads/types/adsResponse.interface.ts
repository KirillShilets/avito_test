import { ApiProperty } from '@nestjs/swagger';
import { AdType } from './ad.type';

export class AdTypeSchema {
  @ApiProperty({ type: 'string', description: 'Name of the advertisement' })
  name: string;

  @ApiProperty({ type: 'number', description: 'Price of the ad' })
  price: number;

  @ApiProperty({
    type: 'string',
    description: 'Description of the advertisement',
    required: false,
  })
  description?: string;

  @ApiProperty({
    type: 'string',
    description: 'Main photo URL or array of photo URLs',
    example: 'https://example.com/image.jpg',
  })
  photos: string | string[];
}

export class AdsResponseInterface {
  @ApiProperty({
    type: [AdTypeSchema],
    description: 'Array of ads',
  })
  advertisements: AdType[];
}
