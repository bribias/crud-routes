import { Router } from 'express';
import Buffy from '../models/Buffy';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const character = await Buffy.insert(req.body);
      res.send(character);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const character = await Buffy.getById(id);

      res.send(character);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const character = await Buffy.getAll();

      res.send(character);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, species } = req.body;
      const updatedCharacter = await Buffy.updateById(id, { name, species });

      res.send(updatedCharacter);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const character = await Buffy.deleteById(id);

      res.send({ message: `${character.name} has been erased` });
    } catch (err) {
      next(err);
    }
  });
