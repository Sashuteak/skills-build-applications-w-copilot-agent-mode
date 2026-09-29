import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const users = await Promise.all([
      User.findOneAndUpdate(
        { username: 'alex' },
        { $set: { email: 'alex@example.com', displayName: 'Alex Morgan' } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { username: 'jordan' },
        { $set: { email: 'jordan@example.com', displayName: 'Jordan Lee' } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { username: 'sam' },
        { $set: { email: 'sam@example.com', displayName: 'Sam Rivera' } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
    ]);
    const [alex, jordan, sam] = users;

    await Promise.all([
      Team.findOneAndUpdate(
        { name: 'Trail Blazers' },
        { $set: { members: [alex._id, jordan._id] } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      Team.findOneAndUpdate(
        { name: 'Power Pacers' },
        { $set: { members: [sam._id] } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
    ]);

    const activities = [
      { user: alex._id, activityType: 'running', durationMinutes: 32, distanceKm: 5.2, points: 52, date: new Date('2026-09-26T08:00:00.000Z') },
      { user: alex._id, activityType: 'strength', durationMinutes: 40, distanceKm: 0, points: 40, date: new Date('2026-09-27T08:00:00.000Z') },
      { user: jordan._id, activityType: 'walking', durationMinutes: 45, distanceKm: 3.4, points: 34, date: new Date('2026-09-26T09:00:00.000Z') },
      { user: jordan._id, activityType: 'running', durationMinutes: 28, distanceKm: 4.1, points: 41, date: new Date('2026-09-28T08:00:00.000Z') },
      { user: sam._id, activityType: 'strength', durationMinutes: 50, distanceKm: 0, points: 50, date: new Date('2026-09-27T09:00:00.000Z') },
      { user: sam._id, activityType: 'walking', durationMinutes: 30, distanceKm: 2.3, points: 23, date: new Date('2026-09-28T09:00:00.000Z') },
    ] as const;

    await Promise.all(activities.map(({ user, activityType, date, ...activity }) =>
      Activity.updateOne(
        { user, activityType, date },
        { $set: { ...activity, user, activityType, date } },
        { upsert: true },
      ),
    ));

    const totals = await Activity.aggregate<{ _id: mongoose.Types.ObjectId; points: number }>([
      { $group: { _id: '$user', points: { $sum: '$points' } } },
      { $sort: { points: -1, _id: 1 } },
    ]);
    await Promise.all(totals.map((total, index) =>
      LeaderboardEntry.updateOne(
        { user: total._id },
        { $set: { points: total.points, rank: index + 1 } },
        { upsert: true },
      ),
    ));

    const workouts = [
      { user: alex._id, title: 'Steady 5K', description: 'Build an even pace with a relaxed distance run.', activityType: 'running', difficulty: 'beginner', targetMinutes: 30 },
      { user: jordan._id, title: 'Lunch Break Walk', description: 'A brisk walk to add easy movement to your day.', activityType: 'walking', difficulty: 'beginner', targetMinutes: 25 },
      { user: sam._id, title: 'Full Body Basics', description: 'A balanced strength session using simple movements.', activityType: 'strength', difficulty: 'intermediate', targetMinutes: 40 },
      { user: null, title: 'Weekend Tempo', description: 'Alternate comfortable running with short tempo intervals.', activityType: 'running', difficulty: 'advanced', targetMinutes: 45 },
    ] as const;

    await Promise.all(workouts.map(({ user = null, title, ...workout }) =>
      Workout.updateOne(
        { user, title },
        { $set: { ...workout, user, title } },
        { upsert: true },
      ),
    ));

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
