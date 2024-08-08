import { MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('simple-array')
  photos: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
