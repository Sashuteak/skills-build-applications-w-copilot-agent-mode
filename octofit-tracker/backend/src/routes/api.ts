import { Router } from 'express';
import { Activity, ActivityTotal, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const apiRouter = Router();

apiRouter.get('/', (_request, response) => {
  response.json({
    baseUrl: response.app.get('baseUrl'),
    users: '/api/users',
    teams: '/api/teams',
    activities: '/api/activities',
    leaderboard: '/api/leaderboard',
    workouts: '/api/workouts',
  });
});

apiRouter.get('/users', async (_request, response) => {
  response.json(await User.find().sort({ username: 1 }).lean());
});

apiRouter.post('/users', async (request, response) => {
  response.status(201).json(await User.create(request.body));
});

apiRouter.get('/teams', async (_request, response) => {
  response.json(await Team.find().populate('members', 'username displayName').lean());
});

apiRouter.post('/teams', async (request, response) => {
  response.status(201).json(await Team.create(request.body));
});

apiRouter.get('/activities', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'username displayName').sort({ date: -1 }).lean());
});

apiRouter.post('/activities', async (request, response) => {
  response.status(201).json(await Activity.create(request.body));
});

apiRouter.get('/leaderboard', async (_request, response) => {
  const totals = await Activity.aggregate<ActivityTotal>([
    { $group: { _id: '$user', points: { $sum: '$points' } } },
    { $sort: { points: -1, _id: 1 } },
  ]);

  if (totals.length === 0) {
    await LeaderboardEntry.deleteMany({});
    response.json([]);
    return;
  }

  await LeaderboardEntry.bulkWrite(totals.map((total, index) => ({
    updateOne: {
      filter: { user: total._id },
      update: { $set: { points: total.points, rank: index + 1 } },
      upsert: true,
    },
  })));
  await LeaderboardEntry.deleteMany({ user: { $nin: totals.map((total) => total._id) } });

  response.json(await LeaderboardEntry.find()
    .sort({ rank: 1 })
    .populate('user', 'username displayName')
    .lean());
});

apiRouter.get('/workouts', async (request, response) => {
  const filter = request.query.userId ? { user: request.query.userId } : {};
  response.json(await Workout.find(filter).sort({ title: 1 }).lean());
});

apiRouter.post('/workouts', async (request, response) => {
  response.status(201).json(await Workout.create(request.body));
});

export default apiRouter;