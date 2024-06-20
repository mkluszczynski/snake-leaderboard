import { Test } from '@nestjs/testing';
import { AuthService } from '../../../src/auth/auth.service';
import { UserService } from '../../../src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InvalidPasswordError } from '../../../src/auth/errors/InvalidPassword.error';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByName: jest
              .fn()
              .mockResolvedValue({ id: 1, name: 'test', password: 'test' }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should return a JWT when login is successful', async () => {
    const result = await authService.logIn('test', 'test');

    expect(result).toEqual('token');
  });

  it('should throw an error when password is incorrect', async () => {
    await expect(authService.logIn('test', 'test')).rejects.toThrow(
      InvalidPasswordError,
    );
  });
});
