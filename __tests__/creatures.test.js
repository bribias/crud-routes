import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Buffy from '../lib/models/Buffy.js';

describe('character CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a character via POST', async () => {
    const character = { name: 'Buffy Summers', species: 'slayer' };
    const res = await request(app).post('/api/v1/buffy').send(character);

    expect(res.body).toEqual({ id: '1', ...character });
  });

  it('gets a character by id', async () => {
    const character = await Buffy.insert({
      name: 'Buffy Summers',
      species: 'slayer',
    });
    const res = await request(app).get(`/api/v1/buffy/${character.id}`);

    expect(res.body).toEqual(character);
  });

  it('gets all character', async () => {
    const character1 = await Buffy.insert({
      name: 'Buffy Summers',
      species: 'slayer',
    });
    const character2 = await Buffy.insert({
      name: 'Willow',
      species: 'witch',
    });
    const res = await request(app).get('/api/v1/buffy');

    expect(res.body).toEqual([character1, character2]);
  });

  it('updates a character by id', async () => {
    const faith = { name: 'Faith', species: 'slayer' };
    const character = await Buffy.insert({
      name: 'Buffy Summers',
      species: 'slayer',
    });
    const res = await request(app)
      .put(`/api/v1/buffy/${character.id}`)
      .send(faith);

    expect(res.body).toEqual({ id: '1', ...faith });
  });

  it('deletes a character', async () => {
    const character = await Buffy.insert({
      name: 'Buffy Summers',
      species: 'slayer',
    });
    const res = await request(app).delete(`/api/v1/buffy/${character.id}`);

    expect(res.body).toEqual({ message: `${character.name} has been erased` });
  });
});
