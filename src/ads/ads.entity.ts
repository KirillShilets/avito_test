import { MaxLength } from 'class-validator';
import {
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'advertisements' })
export class AdsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(200)
  name: string;

  @Column()
  @MaxLength(1000)
  description: string;

  @Column({ type: 'jsonb' })
  photos: string[];

  @Index()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Index()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
