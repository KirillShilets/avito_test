import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdsEntity } from '../ads.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'photos' })
export class AdPhotosEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Unique id for all photos of a specific ad',
  })
  id: number;

  @OneToOne(() => AdsEntity, (ad) => ad.photos)
  @JoinColumn({ name: 'ad_id' })
  @ApiProperty({
    type: AdsEntity,
    description: 'The advertisement related to these photos',
  })
  ad: AdsEntity;

  @Column({ type: 'varchar', length: 400, nullable: false })
  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'The URL of the main photo',
  })
  main_photo: string;

  @Column({ type: 'varchar', length: 400, nullable: true })
  @ApiProperty({
    example: 'https://example.com/image2.jpg',
    description: 'The URL of the second photo',
  })
  second_photo: string;

  @Column({ type: 'varchar', length: 400, nullable: true })
  @ApiProperty({
    example: 'https://example.com/image3.jpg',
    description: 'The URL of the third photo',
  })
  third_photo: string;
}
