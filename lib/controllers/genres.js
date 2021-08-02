import { Router } from 'express';
import Genre from '../models/Genre';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const genre = await Genre.insert(req.body);

      res.send(genre);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const genre = await Genre.getById(id);

      res.send(genre);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const genres = await Genre.getAll();

      res.send(genres);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, type } = req.body;
      const updatedGenre = await Genre.updateById(id, { name, type });

      res.send(updatedGenre);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const genre = await Genre.deleteById(id);

      res.send({ message: `${genre.name} has been erased` });
    } catch (err) {
      next(err);
    }
  });
