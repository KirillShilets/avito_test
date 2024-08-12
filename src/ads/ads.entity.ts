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

@Entity({ name: 'advertisements' })
export class AdsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 1000,
  })
  description: string;

  @OneToOne(() => AdPhotosEntity, (photos) => photos.ad)
  photos: AdPhotosEntity;

  @Index()
  @Column({ type: 'decimal', precision: 10, scale: 0 })
  price: number;

  @Index()
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
