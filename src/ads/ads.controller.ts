import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdsDto } from './dto/createAds.dto';
import { AdResponseInterface } from './types/adResponse.interface';
import { AdsResponseInterface } from './types/adsResponse.interface';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('ads')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create advertisements' })
  @ApiResponse({
    status: 201,
    description: 'Advertisements created successfully',
    example: {
      id: 1,
    },
    schema: {
      properties: {
        id: {
          type: 'number',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({
    description: 'Create advertisements request body',
    type: CreateAdsDto,
  })
  async createAds(@Body('advertisement') createAdsDto: CreateAdsDto): Promise<{
    id: number;
  }> {
    return await this.adsService.createAds(createAdsDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all advertisements with query',
    description: 'Find all advertisements with optional sorting',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description:
      'Sort by: 1 - price ASC, 2 - price DESC, 3 - created_at DESC. Default: created_at ASC',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Advertisements finded successfully',
    type: AdsResponseInterface,
    example: {
      advertisements: [
        {
          name: 'Bag',
          price: 200,
          photos: 'https://example.com/image1.jpg',
        },
        {
          name: 'Car',
          price: 249999,
          photos: 'https://example.com/car.jpeg',
        },
      ],
    },
    schema: {
      properties: {
        name: {
          type: 'string',
        },
        price: {
          type: 'number',
        },
        photos: {
          type: 'string',
          description: 'The main_photo in photos.entity',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async findAllAds(@Query() query: any): Promise<AdsResponseInterface> {
    const ad = await this.adsService.findAllAds(query);
    return this.adsService.buildAdsResponse(ad);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find one advertisement by ID',
    description: 'Get an advertisement with optional fields',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the advertisement',
    required: true,
    type: 'integer',
    example: 1,
  })
  @ApiQuery({
    name: 'fields',
    required: false,
    description:
      'Comma-separated list of optional fields to include: description, photos. Default: name, price, photos (main photo)',
    example: 'description,photos',
  })
  @ApiResponse({
    status: 200,
    description: 'Advertisement finded successfully',
    type: AdResponseInterface,
    example: {
      advertisement: {
        name: 'Bag',
        price: 200,
        photos: 'https://example.com/image1.jpg',
        description: 'Beautiful bag',
        second_photo: 'https://example.com/image2.jpg',
        third_photo: 'https://example.com/image3.jpg',
      },
    },
    schema: {
      properties: {
        name: {
          type: 'string',
        },
        price: {
          type: 'number',
        },
        photos: {
          type: 'string',
          description: 'The main_photo in photos.entity',
        },
        description: {
          type: 'string',
          description: 'Optional description',
        },
        second_photo: {
          type: 'string',
          description: 'Optional second photo',
        },
        third_photo: {
          type: 'string',
          description: 'Optional third photo',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Advertisement not found' })
  async findAd(
    @Param('id') id: number,
    @Query('fields') fields?: string,
  ): Promise<AdResponseInterface> {
    const ad = await this.adsService.findAdById(id, fields);
    return this.adsService.buildAdResponse(ad);
  }
}
