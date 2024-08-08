import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsEntity } from './ads.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdsEntity])],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
