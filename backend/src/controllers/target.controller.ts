import { NextFunction, Request, Response } from 'express';
import { generateBaseDaily } from '../helpers/target.helper';
import { getDailyConsumed, getTarget } from '../services/target.service';
import { IAllUserTargetsResponse, ITargetDailyResponse } from '../ts/models/response/target-responses.model';

export const getTargets = async (req: Request<{}, IAllUserTargetsResponse, {}>, res: Response, next: NextFunction) => {
  try {
    const { _id: user } = req.user;
    const targets = await getTarget(user);

    res.send({ targets });
  } catch (e) {
    next(e);
  }
};

export const getDailyValues = async (req: Request<{}, ITargetDailyResponse, {}>, res: Response, next: NextFunction) => {
  try {
    const { _id: user } = req.user;
    const date = new Date().toLocaleDateString('en-US');
    const daily = await getDailyConsumed(user, date);

    const dailyToSend = !!daily ? daily : generateBaseDaily(user, date);
    
    res.send({ daily: dailyToSend });
  } catch (e) {
    next(e);
  }
};
