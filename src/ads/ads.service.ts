import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdsEntity } from './ads.entity';
import { Repository } from 'typeorm';
import { CreateAdsDto } from './dto/createAds.dto';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(AdsEntity)
    private readonly adsRepository: Repository<AdsEntity>,
  ) {}

  async createAds(createAdsDto: CreateAdsDto) {
    const advertisement = new AdsEntity();
    Object.assign(advertisement, createAdsDto);

    const savedAd = await this.adsRepository.save(advertisement);
    return { id: savedAd.id };
  }
}
