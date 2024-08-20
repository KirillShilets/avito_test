import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsEntity } from './ads.entity';
import { ConfigModule } from '@nestjs/config';
import { AdPhotosEntity } from './photos/photos.entity';
import { SpecService } from './spec/spec.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([AdsEntity, AdPhotosEntity]),
  ],
  controllers: [AdsController],
  providers: [AdsService, SpecService],
})
export class AdsModule {}
