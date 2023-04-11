import { Request, Response } from 'express';
import { getDailyConsumed, getTarget } from '../services/target.service';
import { IAllUserTargetsResponse, ITargetDailyResponse } from '../ts/models/response/target-responses.model';

export const getTargets = async (req: Request<{}, IAllUserTargetsResponse, {}>, res: Response) => {
  const { _id: user } = req.user;
  const targets = await getTarget(user);

  res.send({ targets });
};

export const getDailyValues = async (req: Request<{}, ITargetDailyResponse, {}>, res: Response) => {
  const { _id: user } = req.user;
  const date = new Date().toLocaleDateString('en-US');
  const target = await getDailyConsumed(user, date);

  res.send(target);
};
