import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Creature from '../lib/models/Creatures';

describe('creature CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a creature via POST', async () => {
    const creature = { name: 'Big Foot', species: 'yeti' };
    const res = await request(app).post('/api/v1/creatures').send(creature);

    expect(res.body).toEqual({ id: '1', ...creature });
  });

  it('gets a creature by id', async () => {
    const creature = await Creature.insert({
      name: 'Big Foot',
      species: 'yeti',
    });
    const res = await request(app).get(`/api/v1/creatures/${creature.id}`);

    expect(res.body).toEqual(creature);
  });

  it('gets all creature', async () => {
    const creature1 = await Creature.insert({
      name: 'Big Foot',
      species: 'yeti',
    });
    const creature2 = await Creature.insert({
      name: 'Loch Ness',
      species: 'swap',
    });
    const res = await request(app).get('/api/v1/creatures');

    expect(res.body).toEqual([creature1, creature2]);
  });

  it('updates a creature by id', async () => {
    const kraken = { name: 'Kraken', species: 'sea creature' };
    const creature = await Creature.insert({
      name: 'Big Foot',
      species: 'yeti',
    });
    const res = await request(app)
      .put(`/api/v1/creatures/${creature.id}`)
      .send(kraken);

    expect(res.body).toEqual({ id: '1', ...kraken });
  });

  it('deletes a creature', async () => {
    const creature = await Creature.insert({
      name: 'Big Foot',
      species: 'yeti',
    });
    const res = await request(app).delete(`/api/v1/creatures/${creature.id}`);

    expect(res.body).toEqual({ message: `${creature.name} has been erased` });
  });
});
