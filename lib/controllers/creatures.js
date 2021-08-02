import { Router } from 'express';
import Creature from '../models/Creatures';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const creature = await Creature.insert(req.body);
      res.send(creature);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const creature = await Creature.getById(id);

      res.send(creature);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const creature = await Creature.getAll();

      res.send(creature);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, species } = req.body;
      const updatedCreature = await Creature.updateById(id, { name, species });

      res.send(updatedCreature);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const creature = await Creature.deleteById(id);

      res.send({ message: `${creature.name} has been erased` });
    } catch (err) {
      next(err);
    }
  });
