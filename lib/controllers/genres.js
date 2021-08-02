import { Router } from 'express';
import Genres from '../models/Genres';

export default Router().post('/', async (req, res, next) => {
  try {
    const genre = await Genres.insert(req.body);
    res.send(genre);
  } catch (err) {
    next(err);
  }
});
