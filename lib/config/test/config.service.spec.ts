import { ConfigService } from '../config.service';
import { EnvValueNotFoundError } from '../errors/EnvValueNotFound.error';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    service = new ConfigService();
  });

  describe('get', () => {
    it('should return a value from process.env', () => {
      expect(service.get('DB_NAME')).toBe('snake-leaderboard');
    });

    it('should throw an error if the value is not in process.env', () => {
      expect(() => service.get('TEST')).toThrow(EnvValueNotFoundError);
    });
  });
});
