import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Originals from '../lib/models/Originals';

describe('character CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a character via POST', async () => {
    const original = { name: 'Klaus', species: 'hybrid' };
    const res = await request(app).post('/api/v1/originals').send(original);

    expect(res.body).toEqual({ id: '1', ...original });
  });

  it('gets a character by id', async () => {
    const original = await Originals.insert({ name: 'Klaus', species: 'hybrid' });
    const res = await request(app).get(`/api/v1/originals/${original.id}`);

    expect(res.body).toEqual(original);
  });

  it('gets all character', async () => {
    const original1 = await Originals.insert({ name: 'Klaus', species: 'hybrid' });
    const original2 = await Originals.insert({ name: 'Elijah', species: 'vampire',
    });
    const res = await request(app).get('/api/v1/originals');

    expect(res.body).toEqual([original1, original2]);
  });

  it('updates a character by id', async () => {
    const elijah = { name: 'Elijah', species: 'vampire' };
    const original = await Originals.insert({ name: 'Klaus', species: 'hybrid' });
    const res = await request(app)
      .put(`/api/v1/originals/${original.id}`)
      .send(elijah);

    expect(res.body).toEqual({ id: '1', ...elijah });
  });

  it('deletes a character', async () => {
    const original = await Originals.insert({ name: 'Klaus', species: 'hybrid' });
    const res = await request(app).delete(`/api/v1/originals/${original.id}`);

    expect(res.body).toEqual({ message: `${original.name} has been erased` });
  });
});
