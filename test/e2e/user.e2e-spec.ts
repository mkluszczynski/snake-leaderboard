import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/user/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let testUserId: number = 0;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const userRepository = moduleFixture.get(getRepositoryToken(User));
    await userRepository.clear();

    const resUser = await request(app.getHttpServer())
      .post('/user')
      .send({ username: 'test', password: 'test' });

    testUserId = resUser.body.id;
  });

  it('/user (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/user')
      .send({ username: 'test1', password: 'test1' });
    console.log(res.body);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('username', 'test1');
    expect(res.status).toBe(201);
  });

  it('/user (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/user');
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('id', testUserId);
    expect(res.body[0]).toHaveProperty('username', 'test');
    expect(res.body[0].password).toBeUndefined();
    expect(res.status).toBe(200);
  });

  it('/user/:id (GET)', async () => {
    const res = await request(app.getHttpServer()).get(`/user/${testUserId}`);
    expect(res.body).toHaveProperty('id', testUserId);
    expect(res.body).toHaveProperty('username', 'test');
    expect(res.body.password).toBeUndefined();
    expect(res.status).toBe(200);
  });

  it('/user/:id (GET) 404', async () => {
    const res = await request(app.getHttpServer()).get('/user/:id');
    expect(res.status).toBe(404);
  });

  it('/user/:id (PUT)', async () => {
    const authRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test', password: 'test' });

    expect(authRes.body).toHaveProperty('apiKey');
    expect(authRes.status).toBe(201);

    const res = await request(app.getHttpServer())
      .put(`/user/${testUserId}`)
      .set('Authorization', `Bearer ${authRes.body.apiKey}`)
      .send({ username: 'test1', password: 'test1' });
    expect(res.body).toHaveProperty('id', testUserId);
    expect(res.body).toHaveProperty('username', 'test1');
    expect(res.body.password).toBeUndefined();
    expect(res.status).toBe(200);
  });

  it('/user/:id (DELETE)', async () => {
    const authRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test', password: 'test' });

    expect(authRes.status).toBe(201);
    expect(authRes.body).toHaveProperty('apiKey');

    const res = await request(app.getHttpServer())
      .delete(`/user/${testUserId}`)
      .set('Authorization', `Bearer ${authRes.body.apiKey}`)
      .send();

    expect(res.status).toBe(200);
  });
});
