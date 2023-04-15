import { NextFunction, Request, Response } from 'express';
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
    const target = await getDailyConsumed(user, date);

    res.send(target);
  } catch (e) {
    next(e);
  }
};
