import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class TypeOrmConfigService {
  constructor(private configService: ConfigService) {}

  createDataSourceOptions() {
    return {
      type: 'postgres',
      host: this.configService.get('DATABASE_HOST'),
      port: +this.configService.get('DATABASE_PORT'),
      username: this.configService.get('DATABASE_USER'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_NAME'),
      synchronize: false,
      entities: ['src/**/*.entity.ts'],
      migrations: ['src/migrations/*.ts'],
    } as DataSourceOptions;
  }
}

export const AppDataSource = new DataSource(
  new TypeOrmConfigService(new ConfigService()).createDataSourceOptions(),
);
