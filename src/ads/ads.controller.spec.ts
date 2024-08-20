import { AdsController } from './ads.controller';
import { AdsEntity } from './ads.entity';
import { AdsService } from './ads.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateAdsDto } from './dto/createAds.dto';
import { AdPhotosEntity } from './photos/photos.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdsResponseInterface } from './types/adsResponse.interface';
import { AdResponseInterface } from './types/adResponse.interface';

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

describe('AdsController', () => {
  let adsController: AdsController;
  let adsService: AdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdsController],
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

    adsController = module.get<AdsController>(AdsController);
    adsService = module.get<AdsService>(AdsService);
  });

  describe('createAd', () => {
    it('should return id of created ad', async () => {
      let result: Promise<{
        id: any;
      }>;
      jest.spyOn(adsService, 'createAds').mockImplementation(() => result);
      expect(await adsController.createAds(mockedAd)).toBe(result);
    });
  });

  describe('findAllAds', () => {
    it('should return array of ads', async () => {
      const query = {
        sort: '1',
      };
      const expectedResult: AdsResponseInterface = {
        advertisements: [
          {
            name: 'Test Ad 1',
            photos: 'http://image1.jpg',
            price: 50,
          },
          {
            name: 'Test Ad 2',
            photos: 'http://image2.jpg',
            price: 75,
          },
        ],
      };
      jest
        .spyOn(adsService, 'findAllAds')
        .mockResolvedValue(expectedResult.advertisements);
      const result = await adsController.findAllAds(query);
      expect(result.advertisements).toEqual(expectedResult.advertisements);
    });
  });

  describe('findAd', () => {
    it('should return ad with all fields', async () => {
      const id = 1;
      const fields = 'description,photos';
      const expectedResult: AdResponseInterface = {
        advertisement: {
          name: 'Test Ad',
          price: 100,
          photos: [
            'http://image.jpg',
            'http://image2.jpg',
            'http://image3.jpg',
          ],
          description: 'This is a test ad',
        },
      };
      jest
        .spyOn(adsService, 'findAdById')
        .mockResolvedValue(expectedResult.advertisement);
      const result = await adsController.findAd(id, fields);
      expect(result).toEqual(expectedResult);
    });

    it('should return ad with only name, price and photos', async () => {
      const id = 1;
      const fields = '';
      const expectedResult: AdResponseInterface = {
        advertisement: {
          name: 'Test Ad',
          price: 100,
          photos: ['http://image.jpg'],
          description: undefined,
        },
      };
      jest
        .spyOn(adsService, 'findAdById')
        .mockResolvedValue(expectedResult.advertisement);
      const result = await adsController.findAd(id, fields);
      expect(result).toEqual(expectedResult);
    });
  });
});
