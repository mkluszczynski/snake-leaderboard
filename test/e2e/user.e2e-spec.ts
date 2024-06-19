import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let testUserId: number = 0;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/user')
      .send({ name: 'test', password: 'test' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'test');
    expect(res.body).toHaveProperty('password', 'test');

    testUserId = res.body.id;
  });

  it('/user (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/user');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('id', testUserId);
    expect(res.body[0]).toHaveProperty('name', 'test');
    expect(res.body[0]).toHaveProperty('password', 'test');
  });

  it('/user/:id (GET)', async () => {
    const res = await request(app.getHttpServer()).get(`/user/${testUserId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', testUserId);
    expect(res.body).toHaveProperty('name', 'test');
    expect(res.body).toHaveProperty('password', 'test');
  });

  it('/user/:id (GET) 404', async () => {
    const res = await request(app.getHttpServer()).get('/user/:id');
    expect(res.status).toBe(404);
  });

  it('/user/:id (PUT)', async () => {
    const res = await request(app.getHttpServer())
      .put(`/user/${testUserId}`)
      .send({ name: 'test1', password: 'test1' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', testUserId);
    expect(res.body).toHaveProperty('name', 'test1');
    expect(res.body).toHaveProperty('password', 'test1');
  });

  it('/user/:id (DELETE)', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/user/${testUserId}`,
    );
    expect(res.status).toBe(200);
  });
});
