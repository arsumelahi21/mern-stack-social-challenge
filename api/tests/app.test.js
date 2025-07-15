const request = require('supertest');
const app = require('../app');

describe('RBAC Middleware', () => {
  let adminToken, userToken;

  beforeAll(async () => {
    adminToken = (await request(app).post('/login').send({ id: 'u2' })).body.token;
    userToken = (await request(app).post('/login').send({ id: 'u1' })).body.token;
  });

  it('should allow admin to delete', async () => {
    const res = await request(app)
      .delete('/posts/xyz')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should forbid normal user from deleting', async () => {
    const res = await request(app)
      .delete('/posts/xyz')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(403);
  });

  it('should block missing or invalid token', async () => {
    expect((await request(app).delete('/posts/xyz')).statusCode).toBe(403);
    expect((await request(app)
      .delete('/posts/xyz')
      .set('Authorization', 'Bearer badtoken')).statusCode).toBe(403);
  });
});
