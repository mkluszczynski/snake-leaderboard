import { DataSource } from 'typeorm';
import { ConfigService } from './lib/config/config.service';

const configService = new ConfigService();

const appDataSource = new DataSource({
  type: 'mysql',
  ...configService.dbConfig(),
  entities: ['${__dirname}/../**/*.entity{.ts,.js}'],
  migrations: ['${__dirname}/../.migrations/*{.ts,.js}'],
});

export default appDataSource;
