import { AdsService } from './ads.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateAdsDto } from './dto/createAds.dto';
import { AdPhotosEntity } from './photos/photos.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdsEntity } from './ads.entity';
import { AdType } from './types/ad.type';

const mockAdsRepository = {
  save: jest.fn().mockResolvedValue({ id: 1 }),
  createQueryBuilder: jest.fn(() => ({
    leftJoinAndSelect: jest.fn(() => ({
      offset: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockResolvedValue({
        name: 'Test Ad',
        price: 100,
        photos: 'http://image.jpg',
        description: 'This is a test ad',
      }),
      getRawMany: jest.fn().mockResolvedValue([
        {
          name: 'Test Ad 1',
          price: 75,
          photos: 'http://image.jpg',
        },
        {
          name: 'Test Ad 2',
          price: 50,
          photos: 'http://image.jpg',
        },
      ]),
    })),
  })),
};

const mockAdPhotosRepository = {};

const mockedAd: CreateAdsDto = {
  name: 'test',
  description: 'test',
  photos: ['http://image.jpg', 'http://image.webp', 'http://image.jpeg'],
  price: 12.1,
};

describe('AdsService', () => {
  let adsService: AdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdsService,
        {
          provide: getRepositoryToken(AdsEntity),
          useValue: mockAdsRepository,
        },
        {
          provide: getRepositoryToken(AdPhotosEntity),
          useValue: mockAdPhotosRepository,
        },
      ],
    }).compile();

    adsService = module.get<AdsService>(AdsService);
  });

  describe('createAds', () => {
    it('should return id of created ad', async () => {
      let result: Promise<{
        id: any;
      }>;
      jest.spyOn(adsService, 'createAds').mockImplementation(() => result);
      expect(await adsService.createAds(mockedAd)).toBe(result);
    });
  });

  describe('findAllAds', () => {
    it('should return array of ads', async () => {
      const query = {
        sort: '2',
      };
      const expectedResult: AdType[] = [
        {
          name: 'Test Ad 2',
          photos: 'http://image2.jpg',
          price: 75,
        },
        {
          name: 'Test Ad 1',
          photos: 'http://image1.jpg',
          price: 50,
        },
      ];
      jest.spyOn(adsService, 'findAllAds').mockResolvedValue(expectedResult);
      const result = await adsService.findAllAds(query);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAdById', () => {
    it('should return ad with all fields', async () => {
      const id = 1;
      const fields = 'description,photos';
      const expectedResult: AdType = {
        name: 'Test Ad',
        price: 100,
        photos: ['http://image.jpg', 'http://image2.jpg', 'http://image3.jpg'],
        description: 'This is a test ad',
      };
      jest.spyOn(adsService, 'findAdById').mockResolvedValue(expectedResult);
      const result = await adsService.findAdById(id, fields);
      expect(result).toEqual(expectedResult);
    });

    it('should return ad with only name, price and photos', async () => {
      const id = 1;
      const fields = '';
      const expectedResult: AdType = {
        name: 'Test Ad',
        price: 100,
        photos: ['http://image.jpg'],
        description: undefined,
      };
      jest.spyOn(adsService, 'findAdById').mockResolvedValue(expectedResult);
      const result = await adsService.findAdById(id, fields);
      expect(result).toEqual(expectedResult);
    });
  });
});
