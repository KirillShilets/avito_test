import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdsEntity } from '../ads.entity';

@Entity({ name: 'photos' })
export class AdPhotosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => AdsEntity, (ad) => ad.photos)
  @JoinColumn({ name: 'ad_id' })
  ad: AdsEntity;

  @Column({ type: 'varchar', length: 400, nullable: false })
  main_photo: string;

  @Column({ type: 'varchar', length: 400, nullable: true })
  second_photo: string;

  @Column({ type: 'varchar', length: 400, nullable: true })
  third_photo: string;
}
