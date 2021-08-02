import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Plant from '../lib/models/Plant.js';

describe('plant CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a plant via POST', async () => {
    const plant = { name: 'rubber tree', type: 'ficus' };
    const res = await request(app).post('/api/v1/plants').send(plant);

    expect(res.body).toEqual({ id: '1', ...plant });
  });

  it('gets a plant by id', async () => {
    const plant = await Plant.insert({ name: 'rubber tree', type: 'ficus' });
    const res = await request(app).get(`/api/v1/plants/${plant.id}`);

    expect(res.body).toEqual(plant);
  });
    
  it('gets all plant', async () => {
    const plant1 = await Plant.insert({ name: 'rubber tree', type: 'ficus' });
    const plant2 = await Plant.insert({
      name: 'monstera',
      type: 'aracae',
    });
    const res = await request(app).get('/api/v1/plants');

    expect(res.body).toEqual([plant1, plant2]);
  });
    
  it('updates a plant by id', async () => {
    const monstera = { name: 'monstera', type: 'aracae' };
    const plant = await Plant.insert({ name: 'rubber tree', type: 'ficus' });
    const res = await request(app).put(`/api/v1/plants/${plant.id}`).send(monstera);

    expect(res.body).toEqual({ id: '1', ...monstera });
  });
    
  it('deletes a plant', async () => {
    const plant = await Plant.insert({ name: 'rubber tree', type: 'ficus' });
    const res = await request(app).delete(`/api/v1/plants/${plant.id}`);

    expect(res.body).toEqual({ message: `${plant.name} has been erased` });
  });
});
