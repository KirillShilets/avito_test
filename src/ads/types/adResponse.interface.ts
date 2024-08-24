import { ApiProperty } from '@nestjs/swagger';
import { AdType } from './ad.type';
import { AdTypeSchema } from './adsResponse.interface';

export class AdResponseInterface {
  @ApiProperty({
    type: AdTypeSchema,
  })
  advertisement: AdType;
}
