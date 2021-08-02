import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Genres from '../lib/models/Genres.js';

describe('genre CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a genre via POST', async () => {
    const genre = { name: 'New Wave', type: 'synth' };
    const res = await request(app).post('/api/v1/genres').send(genre);
    expect(res.body).toEqual({ id: '1', ...genre });
  });
});

