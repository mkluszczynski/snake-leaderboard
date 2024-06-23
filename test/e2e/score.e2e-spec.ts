import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Score Controller (e2e)', () => {
  let app: INestApplication;
  let testUserId: number = 0;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const resUser = await request(app.getHttpServer())
      .post('/users')
      .send({ username: 'test', password: 'test' });

    testUserId = resUser.body.id;
  });

  it('/scores (POST)', async () => {
    const authRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test', password: 'test' });

    expect(authRes.body).toHaveProperty('apiKey');
    expect(authRes.status).toBe(201);

    const res = await request(app.getHttpServer())
      .post('/scores')
      .set('Authorization', `Bearer ${authRes.body.apiKey}`)
      .send({ value: 10, userId: 1 });

    expect(res.status).toBe(201);
  });

  it('/score (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/scores')
      .query({ take: 20, skip: 0 });
    console.log(res.body);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('value');
    expect(res.body[0].value).toBe(10);
    expect(res.status).toBe(200);
  });
});
