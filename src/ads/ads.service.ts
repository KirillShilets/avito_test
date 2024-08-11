import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdsEntity } from './ads.entity';
import { Repository } from 'typeorm';
import { CreateAdsDto } from './dto/createAds.dto';
import { errorResponse } from './handlers/errorResponse.handler';
import { AdResponseInterface } from './types/adResponse.interface';
import { AdType } from './types/ad.type';
import { AdsResponseInterface } from './types/adsResponse.interface';

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

  async findAllAds(query: any): Promise<AdType[] | undefined[]> {
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

  async findAdById(id: number, fields?: string): Promise<AdType> {
    const queryBuilder =
      this.adsRepository.createQueryBuilder('advertisements');

    queryBuilder.where('advertisements.id = :id', { id });
    queryBuilder.select([
      'advertisements.name as name',
      'advertisements.price as price',
      'advertisements.photos ->> 0 as photos',
    ]);

    if (fields) {
      const fieldsArray = fields.split(',');
      if (fieldsArray.includes('description')) {
        queryBuilder.addSelect('advertisements.description as description');
      }
      if (fieldsArray.includes('photos')) {
        queryBuilder.addSelect('advertisements.photos as photos');
      }
    }

    return await queryBuilder.getRawOne();
  }

  buildAdResponse(ad: AdType): AdResponseInterface {
    return {
      advertisement: {
        ...ad,
      },
    };
  }

  buildAdsResponse(ads: AdType[]): AdsResponseInterface {
    return {
      advertisements: {
        ...ads,
      },
    };
  }
}
