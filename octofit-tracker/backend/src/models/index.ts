import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  displayName: { type: String, required: true, trim: true },
});

const teamSchema = new Schema({
  name: { type: String, required: true, trim: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activityType: { type: String, enum: ['running', 'walking', 'strength'], required: true },
  durationMinutes: { type: Number, min: 1, required: true },
  distanceKm: { type: Number, min: 0, default: 0 },
  points: { type: Number, min: 0, default: 0 },
  date: { type: Date, default: Date.now },
});

const leaderboardEntrySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, min: 0, required: true },
  rank: { type: Number, min: 1, required: true },
});

const workoutSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  activityType: { type: String, enum: ['running', 'walking', 'strength'], required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  targetMinutes: { type: Number, min: 1, required: true },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export interface ActivityTotal {
  _id: mongoose.Types.ObjectId;
  points: number;
}