import { Request } from 'express';
import { subtractMacros } from '../helpers/meals.helper';
import { ITargetModel, Target } from '../models/target.model';
import { calculateTargetMacros } from '../helpers/target.helper';

export async function getTarget(user: string) {
  try {
    return await Target.find({ user });
  } catch (e) {
    throw new Error('e');
  }
}

export async function getDailyConsumed(user: string, date: string) {
  try {
    return await Target.findOne({ user, dateCreated: date });
  } catch (e) {
    throw new Error('e');
  }
}

export async function getSpecificTarget(req: Request) {
  try {
    const { _id: userId } = req.user;
    const date = new Date().toLocaleDateString('en-US');

    return await Target.findOne({ user: userId, dateCreated: date });
  } catch (e) {
    throw new Error('e');
  }
}

export async function updateTarget(req: Request, targetFromDb: ITargetModel | null) {
  try {
    const { _id: userId } = req.user;
    const { food, quantity } = req.body;
    const date = new Date().toLocaleDateString('en-US');
    const { protein, carbs, fats, kcal } = calculateTargetMacros(food, targetFromDb, quantity);

    return await Target.findOneAndUpdate(
      { user: userId, dateCreated: date },
      {
        protein, carbs, fats, kcal,
      },
      { upsert: true },
    );
  } catch (e) {
    throw new Error('e');
  }
}

export async function subtractMacrosFromTarget(req: Request, targetFromDb: ITargetModel) {
  try {
    const { _id: userId } = req.user;
    const date = new Date().toLocaleDateString('en-US');
    const { protein, carbs, fats, kcal } = subtractMacros(targetFromDb, req.body);

    return await Target.findOneAndUpdate(
      { user: userId, dateCreated: date },
      { protein, carbs, fats, kcal },
      { new: true },
    );
  } catch (e) {
    throw new Error('e');
  }
}
