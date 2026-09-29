import express from 'express';
import db from './config/database.js';

const app = express();

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.status(db.readyState === 1 ? 200 : 503).json({
    status: db.readyState === 1 ? 'ok' : 'database unavailable',
  });
});

app.listen(8000, () => {
  console.log('OctoFit Tracker API listening on port 8000');
});