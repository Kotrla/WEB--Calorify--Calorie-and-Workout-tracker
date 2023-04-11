import mongoose, { Document } from 'mongoose';

export interface ITarget {
  user: string;
  protein: number;
  carbs: number;
  fats: number;
  kcal: number;
  dateCreated: string;
}

export interface ITargetModel extends ITarget, Document {}

const targetSchema = new mongoose.Schema({
  user: { type: String },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fats: { type: Number, default: 0 },
  kcal: { type: Number, default: 0 },
  dateCreated: { type: String },
});

export const Target = mongoose.model<ITargetModel>('Target', targetSchema);
