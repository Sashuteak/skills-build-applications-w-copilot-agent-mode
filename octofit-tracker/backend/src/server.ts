import express from 'express';
import db from './config/database.js';
import apiRouter from './routes/api.js';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const app = express();
app.set('baseUrl', baseUrl);

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.status(db.readyState === 1 ? 200 : 503).json({
    status: db.readyState === 1 ? 'ok' : 'database unavailable',
  });
});

app.listen(8000, () => {
  console.log('OctoFit Tracker API listening on port 8000');
});