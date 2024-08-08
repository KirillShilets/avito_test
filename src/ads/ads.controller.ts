import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdsDto } from './dto/createAds.dto';
import { BackendValidationPipe } from 'src/pipes/backendValidation.pipe';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new BackendValidationPipe())
  async createAds(@Body('advertisement') createAdsDto: CreateAdsDto) {
    return await this.adsService.createAds(createAdsDto);
  }
}
