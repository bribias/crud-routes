import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import genresController from './controllers/genres.js';
import plantsController from './controllers/plants.js';
import creaturesController from './controllers/creatures';
import originalsController from './controllers/originals';
import buffyController from './controllers/buffy';
const app = express();

app.use(express.json());

app.use('/api/v1/genres', genresController);
app.use('/api/v1/plants', plantsController);
app.use('/api/v1/buffy', buffyController);
app.use('/api/v1/originals', originalsController);
app.use('/api/v1/creatures', creaturesController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
