import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'avito_test_user',
  password: '123456',
  database: 'avito',
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts', 'src/seeds/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Typeorm был успешно подключен к PostreSQL');
  })
  .catch((err) => {
    console.error('Ошибка в typeorm.config.ts', err);
  });

export default AppDataSource;
