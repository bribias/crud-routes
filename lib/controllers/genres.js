import { Router } from 'express';
import Genre from '../models/Genre';

export default Router().post('/', async (req, res, next) => {
  try {
    const genre = await Genre.insert(req.body);

    res.send(genre);
  } catch (err) {
    next(err);
  }
});
