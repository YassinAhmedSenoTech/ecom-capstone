import request from 'supertest';
import app from '../src/app';

describe('E-Commerce API Read-Only Integration Tests', () => {

  describe('GET /api/products', () => {
    it('should fetch all products successfully', async () => {
      const res = await request(app).get('/api/products');
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.products || res.body)).toBe(true);
    });
  });

  describe('GET /api/categories', () => {
    it('should fetch all categories successfully', async () => {
      const res = await request(app).get('/api/categories');
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.categories || res.body)).toBe(true);
    });
  });

});