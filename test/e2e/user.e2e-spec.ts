import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({ name: 'test', password: 'test' })
      .expect(201);
  });

  it('/user/:id (GET)', () => {
    return request(app.getHttpServer()).get('/user/1').expect(200);
  });

  it('/user/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/user/1')
      .send({ name: 'test', password: 'test' })
      .expect(200);
  });

  it('/user/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/user/1').expect(200);
  });
});
