import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdPhotosEntity } from './photos/photos.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'advertisements' })
export class AdsEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The id of the ad' })
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @ApiProperty({ example: "women's bag", description: 'The name of the ad' })
  name: string;

  @Column({
    type: 'varchar',
    length: 1000,
  })
  @ApiProperty({
    example: 'Хорошая сумка, недорого',
    description: 'Description of the ad',
  })
  description: string;

  @OneToOne(() => AdPhotosEntity, (photos) => photos.ad)
  @ApiProperty({
    type: AdPhotosEntity,
    description: 'Photos related to the ad',
  })
  photos: AdPhotosEntity;

  @Index()
  @Column({ type: 'decimal', precision: 10, scale: 0 })
  @ApiProperty({
    example: 10,
    description: 'The price that is indicated for the advertisement',
  })
  price: number;

  @Index()
  @CreateDateColumn()
  @ApiProperty({
    example: new Date(),
    description: 'Date when the advertisement was created',
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: new Date(),
    description: 'Date when the advertisement was last updated',
  })
  updated_at: Date;
}
