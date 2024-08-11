import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from './typeorm.config';

@Injectable()
export class TypeORMInitializer {
  private dataSource: DataSource;

  constructor(
    private configService: ConfigService,
    private typeOrmConfigService: TypeOrmConfigService,
  ) {}

  async initialize() {
    // Создайте DataSource
    this.dataSource = new DataSource(
      this.typeOrmConfigService.createDataSourceOptions(),
    );

    // Подключитесь к базе данных
    await this.dataSource.initialize();
  }
}
