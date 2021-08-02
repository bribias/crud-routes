import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import genresController from './controllers/genres.js';
const app = express();

app.use(express.json());

app.use('/api/v1/genres', genresController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
