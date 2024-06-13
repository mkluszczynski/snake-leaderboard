import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { EnvValueNotFoundError } from './errors/EnvValueNotFound.error';

@Injectable()
export class ConfigService {
  public dbConfig() {
    return {
      host: this.get('DB_HOST'),
      port: parseInt(this.get('DB_PORT')),
      username: this.get('DB_USER'),
      password: this.get('DB_PASS'),
      database: this.get('DB_NAME'),
    };
  }

  public get(key: string): string {
    const envValue = process.env[key];

    if (!envValue) {
      throw new EnvValueNotFoundError(
        `Config error - missing environment variable: ${key}`,
      );
    }

    return envValue;
  }
}
