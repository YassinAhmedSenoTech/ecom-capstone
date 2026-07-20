import request from 'supertest';
import app from '../src/app';
describe('GET /api/products', () => {
  it('should fetch all products', async () => {
    const res = await request(app).get('/api/products');
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.products)).toBeTruthy();
  });
});