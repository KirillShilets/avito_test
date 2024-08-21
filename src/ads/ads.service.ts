import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdsEntity } from './ads.entity';
import { Repository } from 'typeorm';
import { CreateAdsDto } from './dto/createAds.dto';
import { AdResponseInterface } from './types/adResponse.interface';
import { AdType } from './types/ad.type';
import { AdsResponseInterface } from './types/adsResponse.interface';
import { AdPhotosEntity } from './photos/photos.entity';
import AppDataSource from '../typeorm.config';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(AdsEntity)
    private readonly adsRepository: Repository<AdsEntity>,
  ) {}

  async createAds(createAdsDto: CreateAdsDto) {
    const advertisement = new AdsEntity();
    Object.assign(advertisement, createAdsDto);

    const photosEntity = new AdPhotosEntity();
    photosEntity.ad = advertisement;
    photosEntity.main_photo = createAdsDto.photos[0];
    photosEntity.second_photo = createAdsDto.photos[1] || null;
    photosEntity.third_photo = createAdsDto.photos[2] || null;

    let savedAd: any;
    await AppDataSource.manager.transaction(
      'SERIALIZABLE',
      async (transactionalEntityManager) => {
        savedAd = await transactionalEntityManager.save(advertisement);
        await transactionalEntityManager.save(photosEntity);
        return Promise.resolve();
      },
    );

    return { id: savedAd.id };
  }

  async findAllAds(query: any): Promise<AdType[]> {
    const queryBuilder = this.adsRepository
      .createQueryBuilder('advertisements')
      .leftJoinAndSelect('advertisements.photos', 'photos');

    queryBuilder
      .offset(0)
      .limit(10)
      .orderBy('advertisements.created_at', 'ASC')
      .select([
        'advertisements.name as name',
        'advertisements.price as price',
        'photos.main_photo as photos',
      ]);

    if (query.sort) {
      if (query.sort == '1') {
        queryBuilder.orderBy('advertisements.price', 'ASC');
      } else if (query.sort == '2') {
        queryBuilder.orderBy('advertisements.price', 'DESC');
      } else if (query.sort == '3') {
        queryBuilder.orderBy('advertisements.created_at', 'DESC');
      }
    }

    return await queryBuilder.getRawMany();
  }

  async findAdById(id: number, fields?: string): Promise<AdType> {
    const queryBuilder = this.adsRepository
      .createQueryBuilder('advertisements')
      .leftJoinAndSelect('advertisements.photos', 'photos');

    queryBuilder.where('advertisements.id = :id', { id });
    queryBuilder.select([
      'advertisements.name as name',
      'advertisements.price as price',
      'photos.main_photo as photos',
    ]);

    if (fields) {
      const fieldsArray = fields.split(',');
      if (fieldsArray.includes('description')) {
        queryBuilder.addSelect('advertisements.description as description');
      }
      if (fieldsArray.includes('photos')) {
        queryBuilder.addSelect('photos.second_photo as second_photo');
        queryBuilder.addSelect('photos.third_photo as third_photo');
      }
    }

    const ad = await queryBuilder.getRawOne();
    if (!ad) {
      throw new HttpException(
        'There is no such advertisements',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      name: ad.name,
      price: ad.price,
      photos: [ad.photos, ad.second_photo, ad.third_photo].filter(
        (photo) => photo,
      ),
      description: ad.description,
    };
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
      advertisements: ads,
    };
  }
}
