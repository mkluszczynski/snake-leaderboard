import { DataSource } from 'typeorm';

const appDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3308,
  username: 'root',
  password: 'root',
  database: 'snake-leaderboard',
  entities: ['${__dirname}/../**/*.entity{.ts,.js}'],
  migrations: ['${__dirname}/../.migrations/*{.ts,.js}'],
});

export default appDataSource;
