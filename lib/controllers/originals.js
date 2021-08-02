import { Router } from 'express';
import Originals from '../models/Originals';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const original = await Originals.insert(req.body);
      res.send(original);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const original = await Originals.getById(id);

      res.send(original);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const original = await Originals.getAll();

      res.send(original);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, species } = req.body;
      const updatedOriginal = await Originals.updateById(id, { name, species });

      res.send(updatedOriginal);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const original = await Originals.deleteById(id);

      res.send({ message: `${original.name} has been erased` });
    } catch (err) {
      next(err);
    }
  });
