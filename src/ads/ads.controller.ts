import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdsDto } from './dto/createAds.dto';
import { BackendValidationPipe } from 'src/pipes/backendValidation.pipe';
import { AdResponseInterface } from './types/adResponse.interface';
import { AdsResponseInterface } from './types/adsResponse.interface';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new BackendValidationPipe())
  async createAds(@Body('advertisement') createAdsDto: CreateAdsDto) {
    return await this.adsService.createAds(createAdsDto);
  }

  @Get()
  @HttpCode(200)
  async findAllAds(@Query() query: any): Promise<AdsResponseInterface> {
    const ad = await this.adsService.findAllAds(query);
    return this.adsService.buildAdsResponse(ad);
  }

  @Get(':id')
  @HttpCode(200)
  async findAd(
    @Param('id') id: number,
    @Query('fields') fields?: string,
  ): Promise<AdResponseInterface> {
    const ad = await this.adsService.findAdById(id, fields);
    return this.adsService.buildAdResponse(ad);
  }
}
