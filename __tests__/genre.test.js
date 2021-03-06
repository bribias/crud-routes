import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Genre from '../lib/models/Genre.js';

describe('genre CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a genre via POST', async () => {
    const genre = { name: 'New Wave', type: 'synth' };
    const res = await request(app).post('/api/v1/genres').send(genre);

    expect(res.body).toEqual({ id: '1', ...genre });
  });

  it('gets a genre by id', async () => {
    const genre = await Genre.insert({ name: 'New Wave', type: 'synth' });
    const res = await request(app).get(`/api/v1/genres/${genre.id}`);

    expect(res.body).toEqual(genre);
  });
  it('gets all genres', async () => {
    const genre1 = await Genre.insert({ name: 'New Wave', type: 'synth' });
    const genre2 = await Genre.insert({
      name: 'Drum & Bass',
      type: 'electronic',
    });
    const res = await request(app).get('/api/v1/genres');

    expect(res.body).toEqual([genre1, genre2]);
  });
  it('updates a genre by id', async () => {
    const indie = { name: 'Indie Rock', type: 'rock' };
    const genre = await Genre.insert({ name: 'New Wave', type: 'synth' });
    const res = await request(app).put(`/api/v1/genres/${genre.id}`).send(indie);

    expect(res.body).toEqual({ id: '1', ...indie });
  });
  it('deletes a genre', async () => {
    const genre = await Genre.insert({ name: 'New Wave', type: 'synth' });
    const res = await request(app).delete(`/api/v1/genres/${genre.id}`);

    expect(res.body).toEqual({ message: `${genre.name} has been erased` });
  });
});
