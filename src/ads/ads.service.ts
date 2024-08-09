import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdsEntity } from './ads.entity';
import { Repository } from 'typeorm';
import { CreateAdsDto } from './dto/createAds.dto';
import { errorResponse } from './handlers/errorResponse.handler';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(AdsEntity)
    private readonly adsRepository: Repository<AdsEntity>,
  ) {}

  async createAds(createAdsDto: CreateAdsDto) {
    const adByName = await this.adsRepository.findOne({
      where: { name: createAdsDto.name },
    });
    if (adByName) {
      errorResponse.errors['name'] = 'has already been taken';
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const advertisement = new AdsEntity();
    Object.assign(advertisement, createAdsDto);

    const savedAd = await this.adsRepository.save(advertisement);
    return { id: savedAd.id };
  }

  async findAllAds(query: any) {
    const queryBuilder =
      this.adsRepository.createQueryBuilder('advertisements');

    queryBuilder
      .offset(0)
      .limit(10)
      .orderBy('advertisements.price', 'ASC')
      .select([
        'advertisements.name as name',
        'advertisements.price as price',
        'advertisements.photos ->> 0 as photos',
      ]);

    if (query.sort) {
      if (query.sort == '1') {
        queryBuilder.orderBy('advertisements.price', 'DESC');
      } else if (query.sort == '2') {
        queryBuilder.orderBy('advertisements.createdAt', 'DESC');
      } else if (query.sort == '3') {
        queryBuilder.orderBy('advertisements.createdAt', 'ASC');
      } else {
        return [];
      }
    }

    return await queryBuilder.getRawMany();
  }
}
